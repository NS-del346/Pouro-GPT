import assert from "node:assert/strict";
import test from "node:test";

import { detectDuplicates } from "../src/duplicate-detect.js";

function image(sha256, perceptualHash) {
  return { width: 393, height: 852, aspectRatio: 0.461268, fileSize: 100, sha256, perceptualHash, expectedViewport: { width: 393, height: 852 }, dimensionPass: true };
}

test("exact duplicates fail distinct required states in strict mode", () => {
  const same = image("same", "0123456789abcdef");
  const result = detectDuplicates([
    { instanceId: "screen-a__393x852", screenId: "screen-a", required: true, image: same },
    { instanceId: "screen-b__393x852", screenId: "screen-b", required: true, image: same },
  ], 0.96, true);
  assert.equal(result.duplicates[0].type, "exact");
  assert.equal(result.findings[0].severity, "error");
});

test("near duplicates remain warnings", () => {
  const result = detectDuplicates([
    { instanceId: "screen-a__393x852", screenId: "screen-a", required: true, image: image("a", "0000000000000000") },
    { instanceId: "screen-b__393x852", screenId: "screen-b", required: true, image: image("b", "0000000000000001") },
  ], 0.96, true);
  assert.equal(result.duplicates[0].type, "near");
  assert.equal(result.findings[0].severity, "warning");
});
