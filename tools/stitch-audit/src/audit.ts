import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { generateContactSheet, type ContactSheetItem } from "./contact-sheet.js";
import {
  loadForbiddenCopyConfig,
  loadRecipeTruthConfig,
  loadScreenManifest,
} from "./config.js";
import { detectDuplicates, type DuplicateCandidate } from "./duplicate-detect.js";
import { detectScreenFolders, extractZipSafely } from "./extract.js";
import { extractVisibleText } from "./html-text.js";
import { inspectImage } from "./image-inspect.js";
import { buildInventory, requiredScreensForSet } from "./inventory.js";
import { writeJsonReport } from "./report-json.js";
import { writeMarkdownReport } from "./report-markdown.js";
import { evaluateForbiddenCopy, evaluateRecipeTruth } from "./rules.js";
import type {
  AuditReport,
  CliOptions,
  ExtractedText,
  Finding,
  FindingDraft,
  ScreenAudit,
  Verdict,
} from "./types.js";

async function prepareOutputDirectory(outputDirectory: string): Promise<void> {
  await mkdir(outputDirectory, { recursive: true });
  for (const name of [
    "report.json",
    "report.md",
    "contact-sheet.png",
    "extracted-text.json",
    "screen-inventory.json",
    "normalized",
  ]) {
    await rm(path.join(outputDirectory, name), { recursive: true, force: true });
  }
  await mkdir(path.join(outputDirectory, "normalized"), { recursive: true });
}

function finalizeFindings(drafts: FindingDraft[]): Finding[] {
  return drafts.map((finding, index) => ({
    id: `F-${String(index + 1).padStart(3, "0")}`,
    ...finding,
  }));
}

function verdictFor(findings: Finding[]): Verdict {
  if (findings.some((finding) => finding.severity === "error")) {
    return "FAIL";
  }
  if (findings.some((finding) => finding.severity === "warning")) {
    return "PASS WITH WARNINGS";
  }
  return "PASS";
}

function safeNormalizedName(instanceId: string): string {
  return instanceId.replace(/[^a-z0-9._-]+/giu, "-").replace(/^-+|-+$/gu, "");
}

export async function runAudit(options: CliOptions): Promise<AuditReport> {
  const inputZip = path.resolve(options.inputZip);
  const outputDirectory = path.resolve(options.outputDirectory);
  await prepareOutputDirectory(outputDirectory);
  const extractionRoot = await mkdtemp(path.join(tmpdir(), "pouro-stitch-audit-"));

  try {
    const [manifest, recipeTruth, forbiddenCopy] = await Promise.all([
      loadScreenManifest(),
      loadRecipeTruthConfig(),
      loadForbiddenCopyConfig(),
    ]);
    await extractZipSafely(inputZip, extractionRoot);
    const detected = await detectScreenFolders(extractionRoot, manifest);
    const { inventory, findings: inventoryFindings } = buildInventory(
      detected,
      manifest,
      options.set,
      options.strict,
    );
    const requiredIds = requiredScreensForSet(manifest, options.set);
    const requiredSet = new Set(requiredIds);
    const manifestById = new Map(manifest.screens.map((screen) => [screen.id, screen]));
    const findingDrafts: FindingDraft[] = [...inventoryFindings];
    const screens: ScreenAudit[] = [];
    const extractedTexts: ExtractedText[] = [];
    const duplicateCandidates: DuplicateCandidate[] = [];
    const imagePaths = new Map<string, string>();
    const seenRequired = new Set<string>();

    for (const detectedScreen of detected) {
      const canonicalId = detectedScreen.screenId ?? detectedScreen.instanceId;
      const manifestScreen = detectedScreen.screenId
        ? manifestById.get(detectedScreen.screenId)
        : undefined;
      const required = detectedScreen.screenId
        ? requiredSet.has(detectedScreen.screenId)
        : false;
      if (required && detectedScreen.screenId) {
        seenRequired.add(detectedScreen.screenId);
      }
      const screenDrafts: FindingDraft[] = [];

      if (!detectedScreen.screenPngPath) {
        screenDrafts.push({
          screenId: canonicalId,
          severity: "error",
          category: "file-completeness",
          message: "Required file is missing: screen.png",
          evidence: [detectedScreen.folderName],
          ruleId: "files.screen-png",
        });
      }
      if (!detectedScreen.codeHtmlPath) {
        screenDrafts.push({
          screenId: canonicalId,
          severity: "error",
          category: "file-completeness",
          message: "Required file is missing: code.html",
          evidence: [detectedScreen.folderName],
          ruleId: "files.code-html",
        });
      }

      let image = null;
      if (detectedScreen.screenPngPath) {
        imagePaths.set(detectedScreen.instanceId, detectedScreen.screenPngPath);
        try {
          image = await inspectImage(
            detectedScreen.screenPngPath,
            manifestScreen?.expectedViewport ?? null,
            manifest.defaultDimensionTolerance,
          );
          if (image.dimensionPass === false) {
            screenDrafts.push({
              screenId: canonicalId,
              severity: "error",
              category: "viewport",
              message: "Screenshot viewport does not match the expected dimensions",
              evidence: [
                `expected=${manifestScreen?.expectedViewport.width}x${manifestScreen?.expectedViewport.height}`,
                `actual=${image.width}x${image.height}`,
                `tolerance=±${manifest.defaultDimensionTolerance}px`,
              ],
              ruleId: "viewport.expected-dimensions",
            });
          }
          duplicateCandidates.push({
            instanceId: detectedScreen.instanceId,
            screenId: canonicalId,
            required,
            image,
          });
        } catch (error) {
          screenDrafts.push({
            screenId: canonicalId,
            severity: "error",
            category: "viewport",
            message: "screen.png could not be inspected",
            evidence: [error instanceof Error ? error.message : String(error)],
            ruleId: "viewport.readable-png",
          });
        }
      }

      let extractedText: ExtractedText | null = null;
      if (detectedScreen.codeHtmlPath) {
        try {
          extractedText = await extractVisibleText(detectedScreen.codeHtmlPath, canonicalId);
          extractedTexts.push(extractedText);
          if (detectedScreen.screenId) {
            screenDrafts.push(
              ...evaluateRecipeTruth(
                detectedScreen.screenId,
                extractedText,
                options.set,
                recipeTruth,
              ),
              ...evaluateForbiddenCopy(detectedScreen.screenId, extractedText, forbiddenCopy),
            );
          } else {
            screenDrafts.push(
              ...evaluateForbiddenCopy(canonicalId, extractedText, forbiddenCopy),
            );
          }
        } catch (error) {
          screenDrafts.push({
            screenId: canonicalId,
            severity: "error",
            category: "html-text",
            message: "code.html could not be parsed",
            evidence: [error instanceof Error ? error.message : String(error)],
            ruleId: "html.readable",
          });
        }
      }

      const normalizedScreenDirectory = path.join(
        outputDirectory,
        "normalized",
        safeNormalizedName(detectedScreen.instanceId),
      );
      await mkdir(normalizedScreenDirectory, { recursive: true });
      if (detectedScreen.screenPngPath) {
        await cp(detectedScreen.screenPngPath, path.join(normalizedScreenDirectory, "screen.png"));
      }
      if (detectedScreen.codeHtmlPath) {
        await cp(detectedScreen.codeHtmlPath, path.join(normalizedScreenDirectory, "code.html"));
      }

      findingDrafts.push(...screenDrafts);
      screens.push({
        instanceId: detectedScreen.instanceId,
        screenId: canonicalId,
        folderName: detectedScreen.folderName,
        required,
        kind: manifestScreen?.kind ?? "unrecognized",
        expectedViewport: manifestScreen?.expectedViewport ?? null,
        files: {
          screenPng: detectedScreen.screenPngPath !== null,
          codeHtml: detectedScreen.codeHtmlPath !== null,
        },
        image,
        extractedText,
        findingIds: [],
      });
    }

    for (const screenId of requiredIds.filter((id) => !seenRequired.has(id))) {
      const manifestScreen = manifestById.get(screenId);
      screens.push({
        instanceId: screenId,
        screenId,
        folderName: null,
        required: true,
        kind: manifestScreen?.kind ?? "primary",
        expectedViewport: manifestScreen?.expectedViewport ?? null,
        files: { screenPng: false, codeHtml: false },
        image: null,
        extractedText: null,
        findingIds: [],
      });
    }

    const duplicateEvaluation = detectDuplicates(
      duplicateCandidates,
      manifest.nearDuplicateThreshold,
      options.strict,
    );
    findingDrafts.push(...duplicateEvaluation.findings);
    const findings = finalizeFindings(findingDrafts);
    for (const screen of screens) {
      screen.findingIds = findings
        .filter(
          (finding) =>
            finding.screenId === screen.screenId ||
            (finding.category === "duplicate-detection" &&
              (finding.evidence.includes(`screenA=${screen.instanceId}`) ||
                finding.evidence.includes(`screenB=${screen.instanceId}`))),
        )
        .map((finding) => finding.id);
    }

    const order = new Map(manifest.screens.map((screen, index) => [screen.id, index]));
    screens.sort((left, right) => {
      const leftOrder = order.get(left.screenId) ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = order.get(right.screenId) ?? Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder || left.instanceId.localeCompare(right.instanceId);
    });

    const extractedTextPath = path.join(outputDirectory, "extracted-text.json");
    const inventoryPath = path.join(outputDirectory, "screen-inventory.json");
    const contactSheetPath = path.join(outputDirectory, "contact-sheet.png");
    const reportJsonPath = path.join(outputDirectory, "report.json");
    const reportMarkdownPath = path.join(outputDirectory, "report.md");
    await Promise.all([
      writeFile(extractedTextPath, `${JSON.stringify(extractedTexts, null, 2)}\n`, "utf8"),
      writeFile(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`, "utf8"),
    ]);

    if (options.contactSheet) {
      const contactItems: ContactSheetItem[] = screens.map((screen) => ({
        instanceId: screen.instanceId,
        kind:
          screen.kind === "unrecognized" || !screen.required
            ? "additional"
            : screen.kind,
        imagePath: imagePaths.get(screen.instanceId) ?? null,
        dimensions: screen.image
          ? `${screen.image.width}x${screen.image.height}`
          : screen.expectedViewport
            ? `expected ${screen.expectedViewport.width}x${screen.expectedViewport.height}`
            : "unknown",
        failed: screen.findingIds.some((id) =>
          findings.some((finding) => finding.id === id && finding.severity === "error"),
        ),
      }));
      await generateContactSheet(
        contactSheetPath,
        contactItems,
        manifest.contactSheetColumns,
      );
    }

    const verdict = verdictFor(findings);
    const report: AuditReport = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      inputZip,
      set: options.set,
      strict: options.strict,
      verdict,
      summary: {
        requiredScreens: requiredIds.length,
        detectedScreens: detected.length,
        missingScreens: inventory.missing.length,
        errors: findings.filter((finding) => finding.severity === "error").length,
        warnings: findings.filter((finding) => finding.severity === "warning").length,
        exactDuplicates: duplicateEvaluation.duplicates.filter(
          (duplicate) => duplicate.type === "exact",
        ).length,
        nearDuplicates: duplicateEvaluation.duplicates.filter(
          (duplicate) => duplicate.type === "near",
        ).length,
      },
      screens,
      inventory,
      duplicates: duplicateEvaluation.duplicates,
      findings,
      artifacts: {
        reportJson: reportJsonPath,
        reportMarkdown: reportMarkdownPath,
        contactSheet: options.contactSheet ? contactSheetPath : null,
        extractedText: extractedTextPath,
        screenInventory: inventoryPath,
        normalizedDirectory: path.join(outputDirectory, "normalized"),
      },
    };

    await writeMarkdownReport(reportMarkdownPath, report);
    await writeJsonReport(reportJsonPath, report);
    return report;
  } finally {
    await rm(extractionRoot, { recursive: true, force: true });
  }
}

export async function writeBlockedReport(
  options: CliOptions,
  error: unknown,
): Promise<AuditReport> {
  const outputDirectory = path.resolve(options.outputDirectory);
  await prepareOutputDirectory(outputDirectory);
  const reportJsonPath = path.join(outputDirectory, "report.json");
  const reportMarkdownPath = path.join(outputDirectory, "report.md");
  const finding: Finding = {
    id: "F-001",
    screenId: null,
    severity: "error",
    category: "blocked",
    message: "Audit could not complete",
    evidence: [error instanceof Error ? error.message : String(error)],
    ruleId: "audit.blocked",
  };
  const report: AuditReport = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    inputZip: path.resolve(options.inputZip),
    set: options.set,
    strict: options.strict,
    verdict: "BLOCKED",
    summary: {
      requiredScreens: 0,
      detectedScreens: 0,
      missingScreens: 0,
      errors: 1,
      warnings: 0,
      exactDuplicates: 0,
      nearDuplicates: 0,
    },
    screens: [],
    inventory: {
      set: options.set,
      required: [],
      detected: [],
      missing: [],
      unrecognized: [],
      duplicates: [],
    },
    duplicates: [],
    findings: [finding],
    artifacts: {
      reportJson: reportJsonPath,
      reportMarkdown: reportMarkdownPath,
      contactSheet: null,
      extractedText: path.join(outputDirectory, "extracted-text.json"),
      screenInventory: path.join(outputDirectory, "screen-inventory.json"),
      normalizedDirectory: path.join(outputDirectory, "normalized"),
    },
  };
  await writeFile(report.artifacts.extractedText, "[]\n", "utf8");
  await writeFile(
    report.artifacts.screenInventory,
    `${JSON.stringify(report.inventory, null, 2)}\n`,
    "utf8",
  );
  await writeMarkdownReport(reportMarkdownPath, report);
  await writeJsonReport(reportJsonPath, report);
  return report;
}
