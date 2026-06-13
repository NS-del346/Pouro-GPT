export type SourceStatus =
  | "verified"
  | "thirdParty"
  | "placeholder"
  | "needsReview";

export type VerificationLevel =
  | "official"
  | "primary"
  | "manufacturer"
  | "competition"
  | "book"
  | "thirdParty"
  | "unverified"
  | "placeholder";

export type ValueProvenance =
  | "source_original"
  | "primary_description_confirmed"
  | "user_supplied_visual_evidence_confirmed"
  | "app_calculated"
  | "app_guidance"
  | "placeholder"
  | "needs_review"
  | "unresolved";

export interface FieldSourceEvidence {
  provenance: ValueProvenance;
  sourceId?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  sourceStatus?: SourceStatus;
  verificationLevel?: VerificationLevel;
  calculationNote?: string;
  note?: string;
}

export type FieldEvidenceMap<FieldName extends string = string> = Partial<
  Record<FieldName, FieldSourceEvidence>
>;
