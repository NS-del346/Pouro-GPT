import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp, { type OverlayOptions } from "sharp";

export interface ContactSheetItem {
  instanceId: string;
  kind: "primary" | "responsive" | "additional";
  imagePath: string | null;
  dimensions: string;
  failed: boolean;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function textSvg(
  width: number,
  height: number,
  text: string,
  color = "#172033",
  fontSize = 17,
): Buffer {
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><text x="10" y="${Math.round(fontSize * 1.35)}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="600" fill="${color}">${escapeXml(text)}</text></svg>`,
  );
}

function borderSvg(width: number, height: number, failed: boolean): Buffer {
  const color = failed ? "#b42318" : "#aab3c2";
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="5" fill="none" stroke="${color}" stroke-width="${failed ? 5 : 2}"/></svg>`,
  );
}

export async function generateContactSheet(
  outputPath: string,
  items: ContactSheetItem[],
  columns: number,
): Promise<void> {
  const safeColumns = Math.max(1, Math.min(columns, 6));
  const cellWidth = 280;
  const cellHeight = 570;
  const gutter = 20;
  const sectionHeadingHeight = 48;
  const outerPadding = 28;
  const groups: Array<{ title: string; kind: ContactSheetItem["kind"] }> = [
    { title: "Primary screens", kind: "primary" },
    { title: "Responsive screens", kind: "responsive" },
    { title: "Additional / unrecognized", kind: "additional" },
  ];
  const activeGroups = groups
    .map((group) => ({ ...group, items: items.filter((item) => item.kind === group.kind) }))
    .filter((group) => group.items.length > 0);

  const width = outerPadding * 2 + safeColumns * cellWidth + (safeColumns - 1) * gutter;
  let height = outerPadding;
  for (const group of activeGroups) {
    height += sectionHeadingHeight;
    height += Math.ceil(group.items.length / safeColumns) * (cellHeight + gutter);
  }
  height += outerPadding;

  const composites: OverlayOptions[] = [];
  let groupTop = outerPadding;
  for (const group of activeGroups) {
    composites.push({
      input: textSvg(width - outerPadding * 2, sectionHeadingHeight, group.title, "#202939", 24),
      left: outerPadding,
      top: groupTop,
    });
    groupTop += sectionHeadingHeight;

    for (let index = 0; index < group.items.length; index += 1) {
      const item = group.items[index];
      const column = index % safeColumns;
      const row = Math.floor(index / safeColumns);
      const left = outerPadding + column * (cellWidth + gutter);
      const top = groupTop + row * (cellHeight + gutter);
      const labelColor = item.failed ? "#b42318" : "#172033";
      composites.push({
        input: textSvg(
          cellWidth,
          52,
          `${item.instanceId} · ${item.dimensions}`,
          labelColor,
          14,
        ),
        left,
        top,
      });

      if (item.imagePath) {
        const image = await sharp(item.imagePath)
          .resize({ width: cellWidth - 24, height: cellHeight - 70, fit: "inside" })
          .png()
          .toBuffer({ resolveWithObject: true });
        composites.push({
          input: image.data,
          left: left + Math.floor((cellWidth - image.info.width) / 2),
          top: top + 55 + Math.floor((cellHeight - 65 - image.info.height) / 2),
        });
      } else {
        composites.push({
          input: Buffer.from(
            `<svg width="${cellWidth - 24}" height="${cellHeight - 80}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#6b7280">MISSING</text></svg>`,
          ),
          left: left + 12,
          top: top + 60,
        });
      }

      composites.push({ input: borderSvg(cellWidth, cellHeight, item.failed), left, top });
    }
    groupTop += Math.ceil(group.items.length / safeColumns) * (cellHeight + gutter);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 238, g: 240, b: 244 },
    },
  })
    .composite(composites)
    .png()
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  if (metadata.format !== "png" || !metadata.width || !metadata.height) {
    throw new Error("Generated contact sheet is not a readable PNG");
  }
}
