import { writeFile } from "node:fs/promises";
export function serializeJsonReport(report) {
    return `${JSON.stringify(report, null, 2)}\n`;
}
export function writeJsonReport(filePath, report) {
    return writeFile(filePath, serializeJsonReport(report), "utf8");
}
