export type AuditSet = "set-a" | "set-b" | "set-c" | "all";

export type Severity = "error" | "warning";

export type Verdict = "PASS" | "PASS WITH WARNINGS" | "FAIL" | "BLOCKED";

export interface Viewport {
  width: number;
  height: number;
}

export interface ManifestScreen {
  id: string;
  sets: Exclude<AuditSet, "all">[];
  kind: "primary" | "responsive";
  expectedViewport: Viewport;
  aliases?: string[];
}

export interface ScreenManifest {
  version: string;
  defaultDimensionTolerance: number;
  nearDuplicateThreshold: number;
  contactSheetColumns: number;
  screens: ManifestScreen[];
}

export interface DetectedScreen {
  instanceId: string;
  folderName: string;
  folderPath: string;
  normalizedName: string;
  screenId: string | null;
  screenPngPath: string | null;
  codeHtmlPath: string | null;
}

export interface InventoryRecord {
  instanceId: string;
  folderName: string;
  normalizedName: string;
  screenId: string | null;
  hasScreenPng: boolean;
  hasCodeHtml: boolean;
}

export interface ScreenInventory {
  set: AuditSet;
  required: string[];
  detected: InventoryRecord[];
  missing: string[];
  unrecognized: string[];
  duplicates: Array<{ screenId: string; folders: string[] }>;
}

export interface ExtractedText {
  screenId: string;
  visibleText: string[];
  grams: string[];
  times: string[];
  ratios: string[];
  temperatures: string[];
  buttons: string[];
  headings: string[];
  numbers: string[];
  normalizedText: string;
}

export interface ImageInspection {
  width: number;
  height: number;
  aspectRatio: number;
  fileSize: number;
  sha256: string;
  perceptualHash: string;
  expectedViewport: Viewport | null;
  dimensionPass: boolean | null;
}

export interface Finding {
  id: string;
  screenId: string | null;
  severity: Severity;
  category: string;
  message: string;
  evidence: string[];
  ruleId: string;
}

export type FindingDraft = Omit<Finding, "id">;

export interface DuplicateResult {
  screenA: string;
  screenB: string;
  similarityScore: number;
  type: "exact" | "near";
  sha256Match: boolean;
}

export interface ScreenAudit {
  instanceId: string;
  screenId: string;
  folderName: string | null;
  required: boolean;
  kind: "primary" | "responsive" | "unrecognized";
  expectedViewport: Viewport | null;
  files: {
    screenPng: boolean;
    codeHtml: boolean;
  };
  image: ImageInspection | null;
  extractedText: ExtractedText | null;
  findingIds: string[];
}

export interface AuditSummary {
  requiredScreens: number;
  detectedScreens: number;
  missingScreens: number;
  errors: number;
  warnings: number;
  exactDuplicates: number;
  nearDuplicates: number;
}

export interface AuditReport {
  version: "1.0";
  timestamp: string;
  inputZip: string;
  set: AuditSet;
  strict: boolean;
  verdict: Verdict;
  summary: AuditSummary;
  screens: ScreenAudit[];
  inventory: ScreenInventory;
  duplicates: DuplicateResult[];
  findings: Finding[];
  artifacts: {
    reportJson: string;
    reportMarkdown: string | null;
    contactSheet: string | null;
    extractedText: string;
    screenInventory: string;
    normalizedDirectory: string;
  };
}

export interface RuleFieldConfig {
  text?: string[];
  textAny?: string[][];
  grams?: string[];
  times?: string[];
  ratios?: string[];
  temperatures?: string[];
  numbers?: string[];
  sequences?: string[];
  buttons?: string[];
  headings?: string[];
}

export interface RecipeTruthRule {
  id: string;
  description: string;
  sets: Exclude<AuditSet, "all">[];
  screenId?: string;
  screenIds?: string[];
  severity?: Severity;
  required?: RuleFieldConfig;
  forbidden?: RuleFieldConfig;
  requiredAnyOf?: RuleFieldConfig[];
}

export interface RecipeTruthConfig {
  version: string;
  rules: RecipeTruthRule[];
}

export interface ForbiddenCopyCategory {
  id: string;
  category: string;
  severity: Severity;
  strings: string[];
  exceptions?: string[];
}

export interface ForbiddenCopyConfig {
  version: string;
  categories: ForbiddenCopyCategory[];
}

export interface CliOptions {
  inputZip: string;
  set: AuditSet;
  outputDirectory: string;
  strict: boolean;
  jsonOnly: boolean;
  contactSheet: boolean;
}
