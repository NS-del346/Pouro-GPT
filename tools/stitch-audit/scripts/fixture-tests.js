import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { runAudit } from "../src/audit.js";
import { generateFixtures } from "./generate-fixtures.js";

const outputs = await generateFixtures();
const temporaryDirectory = await mkdtemp(path.join(tmpdir(), "pouro-stitch-fixture-test-"));
try {
  const valid = await runAudit({ inputZip: outputs.valid, set: "set-a", outputDirectory: path.join(temporaryDirectory, "valid"), strict: true, jsonOnly: false, contactSheet: true });
  assert.equal(valid.verdict, "PASS", `valid fixture should PASS; findings=${JSON.stringify(valid.findings)}`);
  const invalid = await runAudit({ inputZip: outputs.invalid, set: "set-a", outputDirectory: path.join(temporaryDirectory, "invalid"), strict: true, jsonOnly: false, contactSheet: true });
  assert.equal(invalid.verdict, "FAIL", "invalid fixture should FAIL");
  assert.ok(invalid.findings.some((finding) => finding.ruleId === "manifest.unsupported-runnable"));
  assert.ok(invalid.findings.some((finding) => finding.ruleId === "viewport.exact-dimensions"));
  process.stdout.write("Fixture audit assertions passed.\n");
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
