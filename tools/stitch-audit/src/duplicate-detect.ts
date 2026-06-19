import type {
  DuplicateResult,
  FindingDraft,
  ImageInspection,
} from "./types.js";

export interface DuplicateCandidate {
  instanceId: string;
  screenId: string;
  required: boolean;
  image: ImageInspection;
}

export function perceptualSimilarity(left: string, right: string): number {
  if (left.length !== right.length || left.length === 0) {
    return 0;
  }
  const leftValue = BigInt(`0x${left}`);
  const rightValue = BigInt(`0x${right}`);
  let difference = leftValue ^ rightValue;
  let distance = 0;
  while (difference > 0n) {
    distance += Number(difference & 1n);
    difference >>= 1n;
  }
  return Number((1 - distance / (left.length * 4)).toFixed(6));
}

export function detectDuplicates(
  candidates: DuplicateCandidate[],
  nearThreshold: number,
  strict: boolean,
): { duplicates: DuplicateResult[]; findings: FindingDraft[] } {
  const duplicates: DuplicateResult[] = [];
  const findings: FindingDraft[] = [];

  for (let leftIndex = 0; leftIndex < candidates.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < candidates.length; rightIndex += 1) {
      const left = candidates[leftIndex];
      const right = candidates[rightIndex];
      const exact = left.image.sha256 === right.image.sha256;
      const similarityScore = exact
        ? 1
        : perceptualSimilarity(left.image.perceptualHash, right.image.perceptualHash);

      if (!exact && similarityScore < nearThreshold) {
        continue;
      }

      const result: DuplicateResult = {
        screenA: left.instanceId,
        screenB: right.instanceId,
        similarityScore,
        type: exact ? "exact" : "near",
        sha256Match: exact,
      };
      duplicates.push(result);

      const distinctRequiredStates =
        left.required && right.required && left.screenId !== right.screenId;
      const visuallyIdentical = exact || similarityScore === 1;
      findings.push({
        screenId: left.screenId,
        severity:
          strict && distinctRequiredStates && visuallyIdentical ? "error" : "warning",
        category: "duplicate-detection",
        message: `${exact ? "Exact" : "Near"} duplicate screenshots detected: ${left.instanceId} and ${right.instanceId}`,
        evidence: [
          `screenA=${left.instanceId}`,
          `screenB=${right.instanceId}`,
          `similarity=${similarityScore.toFixed(6)}`,
          `sha256Match=${String(exact)}`,
        ],
        ruleId: exact ? "duplicate.exact" : "duplicate.near",
      });
    }
  }

  return { duplicates, findings };
}
