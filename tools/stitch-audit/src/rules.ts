import { normalizeText } from "./html-text.js";
import type {
  AuditSet,
  ExtractedText,
  FindingDraft,
  ForbiddenCopyConfig,
  RecipeTruthConfig,
  RecipeTruthRule,
  RuleFieldConfig,
  Severity,
} from "./types.js";

type FieldName = Exclude<keyof RuleFieldConfig, "textAny">;

function canonical(value: string): string {
  return normalizeText(value)
    .toLocaleLowerCase("en-US")
    .replace(/\s*([/:+×-])\s*/gu, "$1");
}

function fieldValues(extracted: ExtractedText, field: FieldName): string[] {
  if (field === "text" || field === "sequences") {
    return [extracted.normalizedText];
  }
  return extracted[field] ?? [];
}

function containsValue(
  extracted: ExtractedText,
  field: FieldName,
  expected: string,
): boolean {
  const expectedCanonical = canonical(expected);
  const values = fieldValues(extracted, field).map(canonical);
  if (field === "text" || field === "sequences") {
    return values.some((value) => value.includes(expectedCanonical));
  }
  return values.includes(expectedCanonical);
}

interface MissingRequirement {
  field: string;
  value: string;
}

function missingRequirements(
  extracted: ExtractedText,
  fields: RuleFieldConfig,
): MissingRequirement[] {
  const missing: MissingRequirement[] = [];

  for (const [field, values] of Object.entries(fields) as Array<
    [keyof RuleFieldConfig, string[] | string[][]]
  >) {
    if (field === "textAny") {
      for (const alternatives of values as string[][]) {
        if (!alternatives.some((value) => containsValue(extracted, "text", value))) {
          missing.push({ field, value: alternatives.join(" OR ") });
        }
      }
      continue;
    }

    for (const value of values as string[]) {
      if (!containsValue(extracted, field, value)) {
        missing.push({ field, value });
      }
    }
  }

  return missing;
}

function forbiddenMatches(
  extracted: ExtractedText,
  fields: RuleFieldConfig,
): Array<{ field: string; value: string }> {
  const matches: Array<{ field: string; value: string }> = [];
  for (const [field, values] of Object.entries(fields) as Array<
    [keyof RuleFieldConfig, string[]]
  >) {
    if (field === "textAny") {
      continue;
    }
    for (const value of values) {
      if (containsValue(extracted, field, value)) {
        matches.push({ field, value });
      }
    }
  }
  return matches;
}

function appliesToScreen(rule: RecipeTruthRule, screenId: string, set: AuditSet): boolean {
  const setMatches = set === "all" || rule.sets.includes(set);
  const screenMatches =
    rule.screenId === screenId || (rule.screenIds?.includes(screenId) ?? false);
  return setMatches && screenMatches;
}

function ruleFinding(
  rule: RecipeTruthRule,
  screenId: string,
  severity: Severity,
  message: string,
  evidence: string[],
): FindingDraft {
  return {
    screenId,
    severity,
    category: "recipe-truth",
    message,
    evidence,
    ruleId: rule.id,
  };
}

export function evaluateRecipeTruth(
  screenId: string,
  extracted: ExtractedText,
  set: AuditSet,
  config: RecipeTruthConfig,
): FindingDraft[] {
  const findings: FindingDraft[] = [];

  for (const rule of config.rules.filter((candidate) => appliesToScreen(candidate, screenId, set))) {
    const severity = rule.severity ?? "error";
    if (rule.required) {
      const missing = missingRequirements(extracted, rule.required);
      if (missing.length > 0) {
        findings.push(
          ruleFinding(
            rule,
            screenId,
            severity,
            `${rule.description}: required Recipe Truth is missing`,
            missing.map(({ field, value }) => `${field}: ${value}`),
          ),
        );
      }
    }

    if (rule.requiredAnyOf && rule.requiredAnyOf.length > 0) {
      const alternatives = rule.requiredAnyOf.map((fields) => missingRequirements(extracted, fields));
      if (!alternatives.some((missing) => missing.length === 0)) {
        findings.push(
          ruleFinding(
            rule,
            screenId,
            severity,
            `${rule.description}: none of the supported exact patterns matched`,
            alternatives.map(
              (missing, index) =>
                `pattern ${index + 1}: ${missing.map(({ field, value }) => `${field}=${value}`).join(", ")}`,
            ),
          ),
        );
      }
    }

    if (rule.forbidden) {
      const matches = forbiddenMatches(extracted, rule.forbidden);
      if (matches.length > 0) {
        findings.push(
          ruleFinding(
            rule,
            screenId,
            severity,
            `${rule.description}: forbidden Recipe Truth was found`,
            matches.map(({ field, value }) => `${field}: ${value}`),
          ),
        );
      }
    }
  }

  return findings;
}

export function evaluateForbiddenCopy(
  screenId: string,
  extracted: ExtractedText,
  config: ForbiddenCopyConfig,
): FindingDraft[] {
  const findings: FindingDraft[] = [];
  for (const category of config.categories) {
    let searchableText = canonical(extracted.normalizedText);
    for (const exception of category.exceptions ?? []) {
      searchableText = searchableText.replaceAll(canonical(exception), " ");
    }
    const matches = category.strings.filter((value) =>
      searchableText.includes(canonical(value)),
    );
    if (matches.length === 0) {
      continue;
    }
    findings.push({
      screenId,
      severity: category.severity,
      category: "forbidden-copy",
      message: `Forbidden copy category matched: ${category.category}`,
      evidence: matches,
      ruleId: category.id,
    });
  }
  return findings;
}
