import type { FieldSourceEvidence, ValueProvenance } from "../types";

export type ProvenanceLabel =
  | "出典記載値"
  | "アプリ計算値"
  | "アプリガイド"
  | "仮の値"
  | "要確認"
  | "未解決";

const provenanceLabels: Record<ValueProvenance, ProvenanceLabel> = {
  source_original: "出典記載値",
  app_calculated: "アプリ計算値",
  app_guidance: "アプリガイド",
  placeholder: "仮の値",
  needs_review: "要確認",
  unresolved: "未解決",
};

export function getProvenanceLabel(
  evidence: FieldSourceEvidence,
): ProvenanceLabel {
  return provenanceLabels[evidence.provenance];
}

export function isSourceOriginal(evidence: FieldSourceEvidence): boolean {
  return evidence.provenance === "source_original";
}

export function isAppCalculated(evidence: FieldSourceEvidence): boolean {
  return evidence.provenance === "app_calculated";
}

export function isPlaceholderEvidence(evidence: FieldSourceEvidence): boolean {
  return evidence.provenance === "placeholder";
}
