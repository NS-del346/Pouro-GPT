import { writeFile } from "node:fs/promises";

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function findingList(findings) {
  return findings.length
    ? findings.map((finding) => `- **${finding.id} [${finding.severity.toUpperCase()}]** ${finding.message}${finding.evidence.length ? ` — ${finding.evidence.map((item) => `\`${item}\``).join(", ")}` : ""}`).join("\n")
    : "- none";
}

export function renderMarkdownReport(report) {
  const errors = report.findings.filter((finding) => finding.severity === "error");
  const warnings = report.findings.filter((finding) => finding.severity === "warning");
  const duplicateRows = report.duplicates.length
    ? report.duplicates.map((duplicate) => `| ${escapeCell(duplicate.screenA)} | ${escapeCell(duplicate.screenB)} | ${duplicate.type} | ${duplicate.similarityScore.toFixed(6)} |`).join("\n")
    : "| — | — | — | — |";
  const screenRows = report.screens.map((screen) => {
    const actual = screen.image ? `${screen.image.width}x${screen.image.height}` : "unreadable";
    const status = screen.findingIds.some((id) => errors.some((finding) => finding.id === id)) ? "FAIL" : "PASS";
    return `| ${escapeCell(screen.instanceId)} | ${screen.files.png ? "yes" : "no"} | ${screen.files.html ? "yes" : "no"} | ${screen.expectedViewport.width}x${screen.expectedViewport.height} | ${actual} | ${status} |`;
  }).join("\n");
  const authorityRows = report.sourceAuthorityIds.map((id) => `| ${id} | ${report.sourceAuthorityEffectiveDates[id] ?? "unknown"} |`).join("\n");
  return `# Stitch Audit Report

## 1. Verdict

- Verdict: **${report.verdict}**
- Errors: ${report.summary.errors}
- Warnings: ${report.summary.warnings}
- Required artifacts: ${report.summary.requiredScreens}
- Detected artifacts: ${report.summary.detectedScreens}

## 2. Reproducibility

- Tool version: \`${report.toolVersion}\`
- Report schema: \`${report.reportSchemaVersion}\`
- Screen manifest: \`${report.screenManifestVersion}\`
- Recipe Truth config: \`${report.recipeTruthConfigVersion}\`
- Forbidden copy config: \`${report.forbiddenCopyConfigVersion}\`
- Input ZIP: \`${report.inputZipFileName}\`
- Input ZIP SHA-256: \`${report.inputZipSha256 ?? "unavailable"}\`
- Audit set: \`${report.auditSet}\`
- Strict: \`${report.strict}\`
- Run timestamp: \`${report.runTimestamp}\`
- Node: \`${report.nodeVersion}\`

## 3. Source Authorities

| Authority ID | Effective date |
| --- | --- |
${authorityRows}

## 4. Inventory

- Missing: ${report.inventory.missing.length ? report.inventory.missing.map((id) => `\`${id}\``).join(", ") : "none"}
- Unrecognized: ${report.inventory.unrecognized.length ? report.inventory.unrecognized.map((id) => `\`${id}\``).join(", ") : "none"}

## 5. Manifest, Filename, and Viewport Validation

${findingList(report.findings.filter((finding) => ["artifact-manifest", "inventory", "viewport", "html-text"].includes(finding.category)))}

## 6. Recipe Truth

${findingList(report.findings.filter((finding) => finding.category === "recipe-truth"))}

## 7. Forbidden Copy

${findingList(report.findings.filter((finding) => finding.category === "forbidden-copy"))}

## 8. Duplicate Detection

| Screen A | Screen B | Type | Similarity |
| --- | --- | --- | ---: |
${duplicateRows}

${findingList(report.findings.filter((finding) => finding.category === "duplicate-detection"))}

## 9. Screen-by-Screen Findings

| Artifact | PNG | HTML | Expected | Actual | Status |
| --- | --- | --- | --- | --- | --- |
${screenRows || "| — | — | — | — | — | — |"}

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
- Normalized artifacts: \`${report.artifacts.normalizedDirectory}\`

Machine audit PASS is not visual approval or runtime verification.
`;
}

export function writeMarkdownReport(filePath, report) {
  return writeFile(filePath, renderMarkdownReport(report), "utf8");
}
