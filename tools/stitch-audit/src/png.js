import { createHash } from "node:crypto";
import { inflateSync, deflateSync } from "node:zlib";

import { crc32 } from "./crc32.js";

const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const aboveDistance = Math.abs(estimate - above);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) return left;
  if (aboveDistance <= upperLeftDistance) return above;
  return upperLeft;
}

function pngChunks(buffer) {
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(SIGNATURE)) {
    throw new Error("File is not a PNG image");
  }
  const chunks = [];
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    const end = offset + 12 + length;
    if (end > buffer.length) throw new Error("PNG contains a truncated chunk");
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    const expectedCrc = buffer.readUInt32BE(offset + 8 + length);
    if (crc32(Buffer.concat([Buffer.from(type), data])) !== expectedCrc) {
      throw new Error(`PNG chunk CRC mismatch: ${type}`);
    }
    chunks.push({ type, data });
    offset = end;
    if (type === "IEND") break;
  }
  return chunks;
}

export function readPngDimensions(buffer) {
  const chunks = pngChunks(buffer);
  const header = chunks.find((chunk) => chunk.type === "IHDR")?.data;
  if (!header || header.length !== 13) throw new Error("PNG IHDR is missing or invalid");
  return { width: header.readUInt32BE(0), height: header.readUInt32BE(4) };
}

export function decodePng(buffer) {
  const chunks = pngChunks(buffer);
  const header = chunks.find((chunk) => chunk.type === "IHDR")?.data;
  if (!header) throw new Error("PNG IHDR is missing");
  const width = header.readUInt32BE(0);
  const height = header.readUInt32BE(4);
  const bitDepth = header[8];
  const colorType = header[9];
  const interlace = header[12];
  if (bitDepth !== 8 || interlace !== 0) {
    throw new Error("Only non-interlaced 8-bit PNG images are supported");
  }
  const channelsByType = new Map([[0, 1], [2, 3], [3, 1], [4, 2], [6, 4]]);
  const channels = channelsByType.get(colorType);
  if (!channels) throw new Error(`Unsupported PNG color type: ${colorType}`);
  const palette = chunks.find((chunk) => chunk.type === "PLTE")?.data ?? null;
  const transparency = chunks.find((chunk) => chunk.type === "tRNS")?.data ?? null;
  if (colorType === 3 && !palette) throw new Error("Indexed PNG is missing its palette");
  const compressed = Buffer.concat(chunks.filter((chunk) => chunk.type === "IDAT").map((chunk) => chunk.data));
  const raw = inflateSync(compressed);
  const stride = width * channels;
  if (raw.length !== height * (stride + 1)) throw new Error("PNG decompressed data length is invalid");
  const scanlines = Buffer.alloc(height * stride);
  let sourceOffset = 0;
  for (let row = 0; row < height; row += 1) {
    const filter = raw[sourceOffset];
    sourceOffset += 1;
    const rowOffset = row * stride;
    for (let column = 0; column < stride; column += 1) {
      const byte = raw[sourceOffset + column];
      const left = column >= channels ? scanlines[rowOffset + column - channels] : 0;
      const above = row > 0 ? scanlines[rowOffset - stride + column] : 0;
      const upperLeft = row > 0 && column >= channels ? scanlines[rowOffset - stride + column - channels] : 0;
      let value;
      if (filter === 0) value = byte;
      else if (filter === 1) value = byte + left;
      else if (filter === 2) value = byte + above;
      else if (filter === 3) value = byte + Math.floor((left + above) / 2);
      else if (filter === 4) value = byte + paeth(left, above, upperLeft);
      else throw new Error(`Unsupported PNG filter: ${filter}`);
      scanlines[rowOffset + column] = value & 0xff;
    }
    sourceOffset += stride;
  }

  const rgba = Buffer.alloc(width * height * 4);
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    const source = pixel * channels;
    const target = pixel * 4;
    if (colorType === 0) {
      rgba[target] = scanlines[source];
      rgba[target + 1] = scanlines[source];
      rgba[target + 2] = scanlines[source];
      rgba[target + 3] = 255;
    } else if (colorType === 2) {
      rgba[target] = scanlines[source];
      rgba[target + 1] = scanlines[source + 1];
      rgba[target + 2] = scanlines[source + 2];
      rgba[target + 3] = 255;
    } else if (colorType === 3) {
      const index = scanlines[source];
      rgba[target] = palette[index * 3] ?? 0;
      rgba[target + 1] = palette[index * 3 + 1] ?? 0;
      rgba[target + 2] = palette[index * 3 + 2] ?? 0;
      rgba[target + 3] = transparency?.[index] ?? 255;
    } else if (colorType === 4) {
      rgba[target] = scanlines[source];
      rgba[target + 1] = scanlines[source];
      rgba[target + 2] = scanlines[source];
      rgba[target + 3] = scanlines[source + 1];
    } else {
      rgba[target] = scanlines[source];
      rgba[target + 1] = scanlines[source + 1];
      rgba[target + 2] = scanlines[source + 2];
      rgba[target + 3] = scanlines[source + 3];
    }
  }
  return { width, height, data: rgba };
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const output = Buffer.alloc(12 + data.length);
  output.writeUInt32BE(data.length, 0);
  typeBuffer.copy(output, 4);
  data.copy(output, 8);
  output.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return output;
}

export function encodePng({ width, height, data }) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) {
    throw new Error("PNG dimensions must be positive integers");
  }
  if (data.length !== width * height * 4) throw new Error("RGBA buffer length does not match PNG dimensions");
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let row = 0; row < height; row += 1) {
    const target = row * (width * 4 + 1);
    raw[target] = 0;
    data.copy(raw, target + 1, row * width * 4, (row + 1) * width * 4);
  }
  return Buffer.concat([
    SIGNATURE,
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

export function resizeNearest(image, width, height) {
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const sourceY = Math.min(image.height - 1, Math.floor((y + 0.5) * image.height / height));
    for (let x = 0; x < width; x += 1) {
      const sourceX = Math.min(image.width - 1, Math.floor((x + 0.5) * image.width / width));
      const source = (sourceY * image.width + sourceX) * 4;
      const target = (y * width + x) * 4;
      image.data.copy(data, target, source, source + 4);
    }
  }
  return { width, height, data };
}

export function createPatternPng(width, height, seed) {
  const digest = createHash("sha256").update(seed).digest();
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const cell = Math.floor(x * 9 / width) + Math.floor(y * 8 / height) * 9;
      const value = digest[cell % digest.length];
      const offset = (y * width + x) * 4;
      data[offset] = 40 + (value % 190);
      data[offset + 1] = 30 + ((value * 3) % 210);
      data[offset + 2] = 20 + ((value * 7) % 220);
      data[offset + 3] = 255;
    }
  }
  return encodePng({ width, height, data });
}
