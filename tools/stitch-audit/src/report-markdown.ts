import { writeFile } from "node:fs/promises";

import type { AuditReport, Finding } from "./types.js";

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}

function findingList(findings: Finding[]): string {
  if (findings.length === 0) {
    return "None.\n";
  }
  return `${findings
    .map(
      (finding) =>
        `- **${finding.id} [${finding.severity.toUpperCase()}]** ${finding.message}` +
        `${finding.screenId ? ` (\`${finding.screenId}\`)` : ""}` +
        `${finding.evidence.length ? ` — ${finding.evidence.map((item) => `\`${item}\``).join(", ")}` : ""}`,
    )
    .join("\n")}\n`;
}

export function renderMarkdownReport(report: AuditReport): string {
  const errors = report.findings.filter((finding) => finding.severity === "error");
  const warnings = report.findings.filter((finding) => finding.severity === "warning");
  const fileFindings = report.findings.filter((finding) => finding.category === "file-completeness");
  const viewportFindings = report.findings.filter((finding) => finding.category === "viewport");
  const truthFindings = report.findings.filter((finding) => finding.category === "recipe-truth");
  const copyFindings = report.findings.filter((finding) => finding.category === "forbidden-copy");
  const duplicateFindings = report.findings.filter(
    (finding) => finding.category === "duplicate-detection",
  );

  const screenRows = report.screens
    .map((screen) => {
      const actual = screen.image ? `${screen.image.width} × ${screen.image.height}` : "—";
      const expected = screen.expectedViewport
        ? `${screen.expectedViewport.width} × ${screen.expectedViewport.height}`
        : "—";
      const status = screen.findingIds.some((id) =>
        errors.some((finding) => finding.id === id),
      )
        ? "FAIL"
        : screen.findingIds.length > 0
          ? "WARN"
          : "PASS";
      return `| ${escapeCell(screen.instanceId)} | ${screen.required ? "yes" : "no"} | ${screen.files.screenPng ? "yes" : "no"} | ${screen.files.codeHtml ? "yes" : "no"} | ${expected} | ${actual} | ${status} |`;
    })
    .join("\n");

  const duplicateRows = report.duplicates.length
    ? report.duplicates
        .map(
          (duplicate) =>
            `| ${escapeCell(duplicate.screenA)} | ${escapeCell(duplicate.screenB)} | ${duplicate.type} | ${duplicate.similarityScore.toFixed(6)} |`,
        )
        .join("\n")
    : "| — | — | none | — |";

  return `# Stitch Audit Report

## 1. Verdict

**${report.verdict}**

- Errors: ${report.summary.errors}
- Warnings: ${report.summary.warnings}
- Required screens: ${report.summary.requiredScreens}
- Detected screens: ${report.summary.detectedScreens}

## 2. Input

- ZIP: \`${report.inputZip}\`
- Set: \`${report.set}\`
- Strict mode: \`${String(report.strict)}\`
- Timestamp: \`${report.timestamp}\`

## 3. Inventory

- Missing: ${report.inventory.missing.length ? report.inventory.missing.map((id) => `\`${id}\``).join(", ") : "none"}
- Unrecognized: ${report.inventory.unrecognized.length ? report.inventory.unrecognized.map((id) => `\`${id}\``).join(", ") : "none"}
- Duplicate folders: ${report.inventory.duplicates.length}

## 4. File Completeness

${findingList(fileFindings)}
## 5. Viewport Validation

${findingList(viewportFindings)}
## 6. Recipe Truth

${findingList(truthFindings)}
## 7. Forbidden Copy

${findingList(copyFindings)}
## 8. Duplicate Detection

| Screen A | Screen B | Type | Similarity |
| --- | --- | --- | ---: |
${duplicateRows}

${findingList(duplicateFindings)}
## 9. Screen-by-Screen Findings

| Screen | Required | screen.png | code.html | Expected | Actual | Status |
| --- | --- | --- | --- | --- | --- | --- |
${screenRows || "| — | — | — | — | — | — | — |"}

## 10. Warnings

${findingList(warnings)}
## 11. Required Fixes

${findingList(errors)}
## 12. Generated Artifacts

- JSON report: \`${report.artifacts.reportJson}\`
- Markdown report: \`${report.artifacts.reportMarkdown ?? "not generated"}\`
- Contact sheet: \`${report.artifacts.contactSheet ?? "not generated"}\`
- Extracted text: \`${report.artifacts.extractedText}\`
- Screen inventory: \`${report.artifacts.screenInventory}\`
- Normalized screens: \`${report.artifacts.normalizedDirectory}\`
`;
}

export function writeMarkdownReport(filePath: string, report: AuditReport): Promise<void> {
  return writeFile(filePath, renderMarkdownReport(report), "utf8");
}
