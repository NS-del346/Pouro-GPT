import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { readArtifactManifest, validateArtifactManifest } from "../src/artifact-manifest.js";
import { loadScreenManifest } from "../src/config.js";
import { createPatternPng } from "../src/png.js";

const temporaryDirectories = [];
test.afterEach(async () => Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true }))));

async function root() {
  const directory = await mkdtemp(path.join(tmpdir(), "stitch-manifest-test-"));
  temporaryDirectories.push(directory);
  return directory;
}

test("missing and invalid ZIP-root manifests are FAIL findings", async () => {
  const missingRoot = await root();
  const missing = await readArtifactManifest(missingRoot);
  assert.equal(missing.manifest, null);
  assert.equal(missing.findings[0].ruleId, "manifest.required");
  const invalidRoot = await root();
  await writeFile(path.join(invalidRoot, "manifest.json"), "{not-json");
  const invalid = await readArtifactManifest(invalidRoot);
  assert.equal(invalid.manifest, null);
  assert.equal(invalid.findings[0].ruleId, "manifest.required");
});

test("validates deterministic filenames, file parity, duplicates, and unsupported runnable state", async () => {
  const config = await loadScreenManifest();
  const directory = await root();
  await mkdir(path.join(directory, "screens"));
  const manifest = {
    project: "NS-del346/Pouro-GPT", setId: "set-a", generatedAt: "2026-06-21T00:00:00.000Z",
    sourceAuthorityIds: config.sourceAuthorityIds, artifactStatus: "test",
    screens: [{
      stateId: "setup-unsupported", fileName: "screen.png", htmlFileName: "setup-unsupported__393x852.html",
      expectedWidth: 393, expectedHeight: 852, methodId: null, variantId: null,
      recipeTruthSummary: { runnable: true }, sourceStatus: "needsReview", verificationLevel: "unverified", knownGaps: [],
    }, {
      stateId: "setup-unsupported", fileName: "screen.png", htmlFileName: "setup-unsupported__393x852.html",
      expectedWidth: 393, expectedHeight: 852, methodId: null, variantId: null,
      recipeTruthSummary: { runnable: false }, sourceStatus: "needsReview", verificationLevel: "unverified", knownGaps: [],
    }],
  };
  await writeFile(path.join(directory, "manifest.json"), JSON.stringify(manifest));
  await writeFile(path.join(directory, "screens", "screen.png"), createPatternPng(393, 852, "manifest"));
  await writeFile(path.join(directory, "screens", "extra.txt"), "extra");
  const result = await validateArtifactManifest(directory, manifest, config, "set-a", true);
  for (const ruleId of ["manifest.filename-contract", "manifest.duplicate-state", "manifest.duplicate-filename", "manifest.unsupported-runnable", "manifest.file-missing", "manifest.file-extra"]) {
    assert.ok(result.findings.some((finding) => finding.ruleId === ruleId), `missing ${ruleId}`);
  }
});
