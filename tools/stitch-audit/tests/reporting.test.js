import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { runAudit } from "../src/audit.js";
import { renderMarkdownReport } from "../src/report-markdown.js";
import { serializeJsonReport } from "../src/report-json.js";
import { generateFixtures } from "../scripts/generate-fixtures.js";

test("reports ZIP hash, config versions, Authorities, and deterministic findings", async () => {
  const fixtures = await generateFixtures();
  const directory = await mkdtemp(path.join(tmpdir(), "stitch-report-test-"));
  try {
    const options = { inputZip: fixtures.valid, set: "set-a", strict: true, jsonOnly: false, contactSheet: false };
    const first = await runAudit({ ...options, outputDirectory: path.join(directory, "first") });
    const second = await runAudit({ ...options, outputDirectory: path.join(directory, "second") });
    assert.equal(first.verdict, "PASS");
    assert.equal(first.inputZipSha256, second.inputZipSha256);
    assert.match(first.inputZipSha256, /^[a-f0-9]{64}$/u);
    assert.equal(first.toolVersion, "2.0.0");
    assert.equal(first.reportSchemaVersion, "2.0.0");
    assert.equal(first.screenManifestVersion, "2.0.0");
    assert.equal(first.recipeTruthConfigVersion, "2.0.0");
    assert.equal(first.forbiddenCopyConfigVersion, "2.0.0");
    assert.ok(first.sourceAuthorityIds.length >= 8);
    assert.deepEqual(first.findings, second.findings);
    assert.equal(first.verdict, second.verdict);
    const markdown = renderMarkdownReport(first);
    assert.ok(markdown.includes("## 2. Reproducibility"));
    assert.ok(markdown.includes("## 12. Generated Artifacts"));
    assert.equal(JSON.parse(serializeJsonReport(first)).verdict, "PASS");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
