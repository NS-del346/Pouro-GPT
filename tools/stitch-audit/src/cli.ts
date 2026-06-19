#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";

import { runAudit, writeBlockedReport } from "./audit.js";
import type { AuditSet, CliOptions } from "./types.js";

const usage = `Usage:
  npm run stitch:audit -- <stitch-export.zip> [options]

Options:
  --set <set-a|set-b|set-c|all>  Screen/rule set (default: set-a)
  --output <directory>           Output directory (default: artifacts/stitch-audit)
  --strict                       Treat unknown folders and identical states strictly
  --json-only                    Print only the JSON report to stdout
  --no-contact-sheet             Skip contact-sheet.png generation
  --help                         Show this help
`;

export function parseArguments(args: string[]): CliOptions {
  let inputZip = "";
  let set: AuditSet = "set-a";
  let outputDirectory = "artifacts/stitch-audit";
  let strict = false;
  let jsonOnly = false;
  let contactSheet = true;

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--help") {
      process.stdout.write(usage);
      process.exit(0);
    }
    if (argument === "--strict") {
      strict = true;
      continue;
    }
    if (argument === "--json-only") {
      jsonOnly = true;
      continue;
    }
    if (argument === "--no-contact-sheet") {
      contactSheet = false;
      continue;
    }
    if (argument === "--set" || argument === "--output") {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`${argument} requires a value`);
      }
      index += 1;
      if (argument === "--set") {
        if (!["set-a", "set-b", "set-c", "all"].includes(value)) {
          throw new Error(`Unsupported set: ${value}`);
        }
        set = value as AuditSet;
      } else {
        outputDirectory = value;
      }
      continue;
    }
    if (argument.startsWith("--")) {
      throw new Error(`Unknown option: ${argument}`);
    }
    if (inputZip) {
      throw new Error("Exactly one Stitch export ZIP must be provided");
    }
    inputZip = argument;
  }

  if (!inputZip) {
    throw new Error("A Stitch export ZIP path is required");
  }
  if (path.extname(inputZip).toLocaleLowerCase("en-US") !== ".zip") {
    throw new Error("Input must be a .zip file");
  }

  return { inputZip, set, outputDirectory, strict, jsonOnly, contactSheet };
}

async function main(): Promise<void> {
  let options: CliOptions;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n\n${usage}`);
    process.exitCode = 2;
    return;
  }

  try {
    const report = await runAudit(options);
    if (options.jsonOnly) {
      process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    } else {
      process.stdout.write(
        `Stitch audit: ${report.verdict}\nErrors: ${report.summary.errors}; warnings: ${report.summary.warnings}\nReport: ${report.artifacts.reportMarkdown}\n`,
      );
    }
    process.exitCode = report.verdict === "FAIL" ? 1 : 0;
  } catch (error) {
    const report = await writeBlockedReport(options, error);
    if (options.jsonOnly) {
      process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    } else {
      process.stderr.write(
        `Stitch audit: BLOCKED\n${error instanceof Error ? error.message : String(error)}\nReport: ${report.artifacts.reportMarkdown}\n`,
      );
    }
    process.exitCode = 2;
  }
}

if (
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1])
) {
  await main();
}
