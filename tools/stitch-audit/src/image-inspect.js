import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";

import { decodePng, resizeNearest } from "./png.js";

function perceptualHash(image) {
  const resized = resizeNearest(image, 9, 8);
  let value = 0n;
  for (let row = 0; row < 8; row += 1) {
    for (let column = 0; column < 8; column += 1) {
      const left = (row * 9 + column) * 4;
      const right = left + 4;
      const leftLuma = resized.data[left] * 299 + resized.data[left + 1] * 587 + resized.data[left + 2] * 114;
      const rightLuma = resized.data[right] * 299 + resized.data[right + 1] * 587 + resized.data[right + 2] * 114;
      if (leftLuma > rightLuma) value |= 1n << BigInt(63 - (row * 8 + column));
    }
  }
  return value.toString(16).padStart(16, "0");
}

export async function inspectImage(imagePath, expectedViewport, tolerance = 0) {
  const [buffer, fileStats] = await Promise.all([readFile(imagePath), stat(imagePath)]);
  const decoded = decodePng(buffer);
  const dimensionPass = expectedViewport
    ? Math.abs(decoded.width - expectedViewport.width) <= tolerance &&
      Math.abs(decoded.height - expectedViewport.height) <= tolerance
    : null;
  return {
    width: decoded.width,
    height: decoded.height,
    aspectRatio: Number((decoded.width / decoded.height).toFixed(6)),
    fileSize: fileStats.size,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    perceptualHash: perceptualHash(decoded),
    expectedViewport,
    dimensionPass,
  };
}
