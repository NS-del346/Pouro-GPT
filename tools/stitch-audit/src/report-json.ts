import { writeFile } from "node:fs/promises";

import type { AuditReport } from "./types.js";

export function serializeJsonReport(report: AuditReport): string {
  return `${JSON.stringify(report, null, 2)}\n`;
}

export function writeJsonReport(filePath: string, report: AuditReport): Promise<void> {
  return writeFile(filePath, serializeJsonReport(report), "utf8");
}
