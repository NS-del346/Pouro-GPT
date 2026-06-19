import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";

import sharp from "sharp";

import type { ImageInspection, Viewport } from "./types.js";

function bytesToHexBits(bytes: Buffer): string {
  let value = 0n;
  for (let index = 0; index < 64; index += 1) {
    if (bytes[index + Math.floor(index / 8)] > bytes[index + Math.floor(index / 8) + 1]) {
      value |= 1n << BigInt(63 - index);
    }
  }
  return value.toString(16).padStart(16, "0");
}

export async function computePerceptualHash(imagePath: string): Promise<string> {
  const pixels = await sharp(imagePath)
    .resize(9, 8, { fit: "fill" })
    .greyscale()
    .raw()
    .toBuffer();
  return bytesToHexBits(pixels);
}

export async function inspectImage(
  imagePath: string,
  expectedViewport: Viewport | null,
  tolerance: number,
): Promise<ImageInspection> {
  const [buffer, fileStats, metadata, perceptualHash] = await Promise.all([
    readFile(imagePath),
    stat(imagePath),
    sharp(imagePath).metadata(),
    computePerceptualHash(imagePath),
  ]);
  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height || metadata.format !== "png") {
    throw new Error(`screen.png is not a readable PNG image: ${imagePath}`);
  }

  const dimensionPass = expectedViewport
    ? Math.abs(width - expectedViewport.width) <= tolerance &&
      Math.abs(height - expectedViewport.height) <= tolerance
    : null;

  return {
    width,
    height,
    aspectRatio: Number((width / height).toFixed(6)),
    fileSize: fileStats.size,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    perceptualHash,
    expectedViewport,
    dimensionPass,
  };
}
