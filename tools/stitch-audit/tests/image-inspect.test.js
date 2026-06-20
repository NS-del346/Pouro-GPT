import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { inspectImage } from "../src/image-inspect.js";
import { createPatternPng } from "../src/png.js";

test("exact dimensions pass and every plus/minus one-pixel case fails", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "stitch-image-test-"));
  try {
    for (const [width, height, expected] of [[393, 852, true], [394, 852, false], [392, 852, false], [393, 853, false], [393, 851, false]]) {
      const file = path.join(directory, `${width}x${height}.png`);
      await writeFile(file, createPatternPng(width, height, `${width}x${height}`));
      const inspection = await inspectImage(file, { width: 393, height: 852 }, 0);
      assert.equal(inspection.dimensionPass, expected, `${width}x${height}`);
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
