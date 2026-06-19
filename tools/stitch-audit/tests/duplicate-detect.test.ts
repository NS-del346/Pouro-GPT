import { expect, it } from "vitest";

import { detectDuplicates } from "../src/duplicate-detect.js";
import type { ImageInspection } from "../src/types.js";

const image: ImageInspection = {
  width: 393,
  height: 852,
  aspectRatio: 0.461268,
  fileSize: 100,
  sha256: "same",
  perceptualHash: "0123456789abcdef",
  expectedViewport: { width: 393, height: 852 },
  dimensionPass: true,
};

it("detects exact duplicates and fails distinct required states in strict mode", () => {
  const result = detectDuplicates(
    [
      { instanceId: "screen-a", screenId: "screen-a", required: true, image },
      { instanceId: "screen-b", screenId: "screen-b", required: true, image },
    ],
    0.96,
    true,
  );
  expect(result.duplicates).toEqual([
    expect.objectContaining({ screenA: "screen-a", screenB: "screen-b", type: "exact", similarityScore: 1 }),
  ]);
  expect(result.findings[0].severity).toBe("error");
});
