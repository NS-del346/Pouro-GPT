import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { decodePng, encodePng, resizeNearest } from "./png.js";

const FONT = {
  " ": [0,0,0,0,0,0,0], "-": [0,0,0,31,0,0,0], ":": [0,4,4,0,4,4,0], "_": [0,0,0,0,0,0,31],
  "0": [14,17,19,21,25,17,14], "1": [4,12,4,4,4,4,14], "2": [14,17,1,2,4,8,31], "3": [30,1,1,14,1,1,30],
  "4": [2,6,10,18,31,2,2], "5": [31,16,16,30,1,1,30], "6": [14,16,16,30,17,17,14], "7": [31,1,2,4,8,8,8],
  "8": [14,17,17,14,17,17,14], "9": [14,17,17,15,1,1,14],
  "A": [14,17,17,31,17,17,17], "B": [30,17,17,30,17,17,30], "C": [14,17,16,16,16,17,14], "D": [30,17,17,17,17,17,30],
  "E": [31,16,16,30,16,16,31], "F": [31,16,16,30,16,16,16], "G": [14,17,16,23,17,17,15], "H": [17,17,17,31,17,17,17],
  "I": [14,4,4,4,4,4,14], "J": [7,2,2,2,2,18,12], "K": [17,18,20,24,20,18,17], "L": [16,16,16,16,16,16,31],
  "M": [17,27,21,21,17,17,17], "N": [17,25,21,19,17,17,17], "O": [14,17,17,17,17,17,14], "P": [30,17,17,30,16,16,16],
  "Q": [14,17,17,17,21,18,13], "R": [30,17,17,30,20,18,17], "S": [15,16,16,14,1,1,30], "T": [31,4,4,4,4,4,4],
  "U": [17,17,17,17,17,17,14], "V": [17,17,17,17,17,10,4], "W": [17,17,17,21,21,21,10], "X": [17,17,10,4,10,17,17],
  "Y": [17,17,10,4,4,4,4], "Z": [31,1,2,4,8,16,31],
};

function fill(canvas, color) {
  for (let index = 0; index < canvas.data.length; index += 4) {
    canvas.data[index] = color[0]; canvas.data[index + 1] = color[1]; canvas.data[index + 2] = color[2]; canvas.data[index + 3] = 255;
  }
}

function rectangle(canvas, x, y, width, height, color) {
  for (let row = Math.max(0, y); row < Math.min(canvas.height, y + height); row += 1) {
    for (let column = Math.max(0, x); column < Math.min(canvas.width, x + width); column += 1) {
      const offset = (row * canvas.width + column) * 4;
      canvas.data[offset] = color[0]; canvas.data[offset + 1] = color[1]; canvas.data[offset + 2] = color[2]; canvas.data[offset + 3] = 255;
    }
  }
}

function drawText(canvas, text, x, y, color = [23, 32, 51], scale = 2) {
  let cursor = x;
  for (const character of text.toUpperCase()) {
    const glyph = FONT[character] ?? FONT[" "];
    for (let row = 0; row < 7; row += 1) {
      for (let column = 0; column < 5; column += 1) {
        if ((glyph[row] & (1 << (4 - column))) !== 0) rectangle(canvas, cursor + column * scale, y + row * scale, scale, scale, color);
      }
    }
    cursor += 6 * scale;
  }
}

function blit(canvas, image, x, y) {
  for (let row = 0; row < image.height; row += 1) {
    const sourceStart = row * image.width * 4;
    image.data.copy(canvas.data, ((y + row) * canvas.width + x) * 4, sourceStart, sourceStart + image.width * 4);
  }
}

export async function generateContactSheet(outputPath, items, columns) {
  const cellWidth = 240;
  const previewHeight = 360;
  const labelHeight = 58;
  const rows = Math.max(1, Math.ceil(items.length / columns));
  const canvas = { width: columns * cellWidth, height: rows * (previewHeight + labelHeight), data: Buffer.alloc(columns * cellWidth * rows * (previewHeight + labelHeight) * 4) };
  fill(canvas, [232, 236, 244]);
  for (const [index, item] of items.entries()) {
    const x = (index % columns) * cellWidth;
    const y = Math.floor(index / columns) * (previewHeight + labelHeight);
    rectangle(canvas, x + 4, y + 4, cellWidth - 8, previewHeight - 8, item.failed ? [255, 228, 228] : [255, 255, 255]);
    if (item.imagePath) {
      const decoded = decodePng(await readFile(item.imagePath));
      const ratio = Math.min((cellWidth - 16) / decoded.width, (previewHeight - 16) / decoded.height);
      const resized = resizeNearest(decoded, Math.max(1, Math.floor(decoded.width * ratio)), Math.max(1, Math.floor(decoded.height * ratio)));
      blit(canvas, resized, x + Math.floor((cellWidth - resized.width) / 2), y + Math.floor((previewHeight - resized.height) / 2));
    }
    rectangle(canvas, x, y + previewHeight, cellWidth, labelHeight, item.failed ? [255, 210, 210] : [255, 255, 255]);
    drawText(canvas, item.instanceId.slice(0, 36), x + 8, y + previewHeight + 8, [23, 32, 51], 1);
    drawText(canvas, item.dimensions, x + 8, y + previewHeight + 28, [75, 85, 105], 1);
  }
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, encodePng(canvas));
}
