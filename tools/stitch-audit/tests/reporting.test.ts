import { describe, expect, it } from "vitest";

import { serializeJsonReport } from "../src/report-json.js";
import { renderMarkdownReport } from "../src/report-markdown.js";
import type { AuditReport } from "../src/types.js";

const report: AuditReport = {
  version: "1.0",
  timestamp: "2026-06-20T00:00:00.000Z",
  inputZip: "fixture.zip",
  set: "set-a",
  strict: true,
  verdict: "PASS",
  summary: { requiredScreens: 1, detectedScreens: 1, missingScreens: 0, errors: 0, warnings: 0, exactDuplicates: 0, nearDuplicates: 0 },
  screens: [{ instanceId: "home-empty", screenId: "home-empty", folderName: "home-empty", required: true, kind: "primary", expectedViewport: { width: 393, height: 852 }, files: { screenPng: true, codeHtml: true }, image: null, extractedText: null, findingIds: [] }],
  inventory: { set: "set-a", required: ["home-empty"], detected: [], missing: [], unrecognized: [], duplicates: [] },
  duplicates: [],
  findings: [],
  artifacts: { reportJson: "report.json", reportMarkdown: "report.md", contactSheet: "contact-sheet.png", extractedText: "extracted-text.json", screenInventory: "screen-inventory.json", normalizedDirectory: "normalized" },
};

describe("report generation", () => {
  it("generates the required Markdown report sections", () => {
    const markdown = renderMarkdownReport(report);
    expect(markdown).toContain("# Stitch Audit Report");
    expect(markdown).toContain("## 12. Generated Artifacts");
  });

  it("generates a machine-readable JSON report", () => {
    const parsed = JSON.parse(serializeJsonReport(report));
    expect(parsed.version).toBe("1.0");
    expect(parsed.verdict).toBe("PASS");
  });
});
