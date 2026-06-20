import { createHash } from "node:crypto";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { readArtifactManifest, validateArtifactManifest } from "./artifact-manifest.js";
import { generateContactSheet } from "./contact-sheet.js";
import { loadForbiddenCopyConfig, loadRecipeTruthConfig, loadScreenManifest, loadToolVersion } from "./config.js";
import { detectDuplicates } from "./duplicate-detect.js";
import { extractVisibleText } from "./html-text.js";
import { inspectImage } from "./image-inspect.js";
import { buildInventory, requiredArtifactKeys } from "./inventory.js";
import { writeJsonReport } from "./report-json.js";
import { writeMarkdownReport } from "./report-markdown.js";
import { evaluateForbiddenCopy, evaluateRecipeTruth } from "./rules.js";
import { extractZipSafely } from "./zip.js";

const REPORT_SCHEMA_VERSION = "2.0.0";

async function prepareOutputDirectory(outputDirectory) {
  await mkdir(outputDirectory, { recursive: true });
  for (const name of ["report.json", "report.md", "contact-sheet.png", "extracted-text.json", "screen-inventory.json", "normalized"]) {
    await rm(path.join(outputDirectory, name), { recursive: true, force: true });
  }
  await mkdir(path.join(outputDirectory, "normalized"), { recursive: true });
}

function finalizeFindings(drafts) {
  return drafts.map((finding, index) => ({ id: `F-${String(index + 1).padStart(3, "0")}`, ...finding }));
}

function verdictFor(findings) {
  if (findings.some((finding) => finding.severity === "error")) return "FAIL";
  if (findings.some((finding) => finding.severity === "warning")) return "PASS WITH WARNINGS";
  return "PASS";
}

function metadataFor({ toolVersion, screenManifest, recipeTruth, forbiddenCopy, inputZipSha256, inputZipFileName, options }) {
  return {
    toolVersion,
    reportSchemaVersion: REPORT_SCHEMA_VERSION,
    screenManifestVersion: screenManifest.version,
    recipeTruthConfigVersion: recipeTruth.version,
    forbiddenCopyConfigVersion: forbiddenCopy.version,
    sourceAuthorityIds: screenManifest.sourceAuthorityIds,
    sourceAuthorityEffectiveDates: screenManifest.sourceAuthorityEffectiveDates,
    inputZipSha256,
    inputZipFileName,
    auditSet: options.set,
    strict: options.strict,
    runTimestamp: new Date().toISOString(),
    nodeVersion: process.version,
  };
}

export async function runAudit(options) {
  const inputZip = path.resolve(options.inputZip);
  const outputDirectory = path.resolve(options.outputDirectory);
  await prepareOutputDirectory(outputDirectory);
  const extractionRoot = await mkdtemp(path.join(tmpdir(), "pouro-stitch-audit-"));
  try {
    const [screenManifest, recipeTruth, forbiddenCopy, toolVersion, zipBuffer] = await Promise.all([
      loadScreenManifest(), loadRecipeTruthConfig(), loadForbiddenCopyConfig(), loadToolVersion(), readFile(inputZip),
    ]);
    const inputZipSha256 = createHash("sha256").update(zipBuffer).digest("hex");
    await extractZipSafely(inputZip, extractionRoot);
    const manifestRead = await readArtifactManifest(extractionRoot);
    const validation = await validateArtifactManifest(extractionRoot, manifestRead.manifest, screenManifest, options.set, options.strict);
    const inventory = buildInventory(validation.detected, screenManifest, options.set);
    const findingDrafts = [...manifestRead.findings, ...validation.findings];
    for (const key of inventory.missing) {
      if (!findingDrafts.some((finding) => finding.ruleId === "manifest.required-screen" && finding.message.includes(key))) {
        findingDrafts.push({ screenId: key.split("__")[0], severity: "error", category: "inventory", message: `Required artifact is missing: ${key}`, evidence: [key], ruleId: "inventory.required-artifact" });
      }
    }

    const screens = [];
    const extractedTexts = [];
    const duplicateCandidates = [];
    const imagePaths = new Map();
    for (const screen of validation.detected) {
      const imagePath = path.join(extractionRoot, "screens", screen.fileName ?? "missing.png");
      const htmlPath = path.join(extractionRoot, "screens", screen.htmlFileName ?? "missing.html");
      const expectedViewport = screen.configured?.expectedViewport ?? { width: screen.expectedWidth, height: screen.expectedHeight };
      const screenDrafts = [];
      let image = null;
      try {
        image = await inspectImage(imagePath, expectedViewport, screenManifest.defaultDimensionTolerance);
        if (image.dimensionPass === false) {
          screenDrafts.push({
            screenId: screen.stateId, severity: "error", category: "viewport",
            message: "Screenshot viewport does not exactly match the expected dimensions",
            evidence: [`expected=${expectedViewport.width}x${expectedViewport.height}`, `actual=${image.width}x${image.height}`, "tolerance=0px"],
            ruleId: "viewport.exact-dimensions",
          });
        }
        imagePaths.set(screen.key, imagePath);
        duplicateCandidates.push({ instanceId: screen.key, screenId: screen.stateId, required: Boolean(screen.configured), image });
      } catch (error) {
        screenDrafts.push({ screenId: screen.stateId, severity: "error", category: "viewport", message: "Declared PNG could not be inspected", evidence: [error instanceof Error ? error.message : String(error)], ruleId: "viewport.readable-png" });
      }
      let extractedText = null;
      try {
        extractedText = await extractVisibleText(htmlPath, screen.stateId);
        extractedTexts.push({ instanceId: screen.key, ...extractedText });
        screenDrafts.push(
          ...evaluateRecipeTruth(screen.stateId, extractedText, options.set, recipeTruth),
          ...evaluateForbiddenCopy(screen.stateId, extractedText, forbiddenCopy),
        );
      } catch (error) {
        screenDrafts.push({ screenId: screen.stateId, severity: "error", category: "html-text", message: "Declared HTML could not be parsed", evidence: [error instanceof Error ? error.message : String(error)], ruleId: "html.readable" });
      }
      const normalizedDirectory = path.join(outputDirectory, "normalized");
      try { await cp(imagePath, path.join(normalizedDirectory, screen.fileName)); } catch {}
      try { await cp(htmlPath, path.join(normalizedDirectory, screen.htmlFileName)); } catch {}
      findingDrafts.push(...screenDrafts);
      screens.push({
        instanceId: screen.key,
        screenId: screen.stateId,
        fileName: screen.fileName,
        htmlFileName: screen.htmlFileName,
        required: Boolean(screen.configured),
        kind: screen.configured?.kind ?? "unrecognized",
        expectedViewport,
        files: { png: validation.files.includes(`screens/${screen.fileName}`), html: validation.files.includes(`screens/${screen.htmlFileName}`) },
        provenance: { methodId: screen.methodId, variantId: screen.variantId, sourceStatus: screen.sourceStatus, verificationLevel: screen.verificationLevel, knownGaps: screen.knownGaps },
        image,
        extractedText,
        findingIds: [],
      });
    }

    const duplicateEvaluation = detectDuplicates(duplicateCandidates, screenManifest.nearDuplicateThreshold, options.strict);
    findingDrafts.push(...duplicateEvaluation.findings);
    const findings = finalizeFindings(findingDrafts);
    for (const screen of screens) {
      screen.findingIds = findings.filter((finding) =>
        finding.screenId === screen.screenId ||
        (finding.category === "duplicate-detection" && (finding.evidence.includes(`screenA=${screen.instanceId}`) || finding.evidence.includes(`screenB=${screen.instanceId}`)))
      ).map((finding) => finding.id);
    }
    const configuredOrder = new Map(screenManifest.screens.map((screen, index) => [screen.fileName, index]));
    screens.sort((left, right) => (configuredOrder.get(left.fileName) ?? Number.MAX_SAFE_INTEGER) - (configuredOrder.get(right.fileName) ?? Number.MAX_SAFE_INTEGER) || left.instanceId.localeCompare(right.instanceId));

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
      await generateContactSheet(contactSheetPath, screens.map((screen) => ({
        instanceId: screen.instanceId,
        kind: screen.kind === "unrecognized" || !screen.required ? "additional" : screen.kind,
        imagePath: imagePaths.get(screen.instanceId) ?? null,
        dimensions: screen.image ? `${screen.image.width}x${screen.image.height}` : `expected ${screen.expectedViewport.width}x${screen.expectedViewport.height}`,
        failed: screen.findingIds.some((id) => findings.some((finding) => finding.id === id && finding.severity === "error")),
      })), screenManifest.contactSheetColumns);
    }
    const metadata = metadataFor({ toolVersion, screenManifest, recipeTruth, forbiddenCopy, inputZipSha256, inputZipFileName: path.basename(inputZip), options });
    const verdict = verdictFor(findings);
    const report = {
      version: REPORT_SCHEMA_VERSION,
      ...metadata,
      timestamp: metadata.runTimestamp,
      inputZip,
      set: options.set,
      strict: options.strict,
      verdict,
      summary: {
        requiredScreens: requiredArtifactKeys(screenManifest, options.set).length,
        detectedScreens: validation.detected.length,
        missingScreens: inventory.missing.length,
        errors: findings.filter((finding) => finding.severity === "error").length,
        warnings: findings.filter((finding) => finding.severity === "warning").length,
        exactDuplicates: duplicateEvaluation.duplicates.filter((duplicate) => duplicate.type === "exact").length,
        nearDuplicates: duplicateEvaluation.duplicates.filter((duplicate) => duplicate.type === "near").length,
      },
      artifactManifest: manifestRead.manifest,
      screens,
      inventory,
      duplicates: duplicateEvaluation.duplicates,
      findings,
      artifacts: {
        reportJson: reportJsonPath, reportMarkdown: reportMarkdownPath,
        contactSheet: options.contactSheet ? contactSheetPath : null,
        extractedText: extractedTextPath, screenInventory: inventoryPath,
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

export async function writeBlockedReport(options, error) {
  const outputDirectory = path.resolve(options.outputDirectory);
  await prepareOutputDirectory(outputDirectory);
  const [screenManifest, recipeTruth, forbiddenCopy, toolVersion] = await Promise.all([loadScreenManifest(), loadRecipeTruthConfig(), loadForbiddenCopyConfig(), loadToolVersion()]);
  let inputZipSha256 = null;
  try { inputZipSha256 = createHash("sha256").update(await readFile(path.resolve(options.inputZip))).digest("hex"); } catch {}
  const metadata = metadataFor({ toolVersion, screenManifest, recipeTruth, forbiddenCopy, inputZipSha256, inputZipFileName: path.basename(options.inputZip), options });
  const reportJsonPath = path.join(outputDirectory, "report.json");
  const reportMarkdownPath = path.join(outputDirectory, "report.md");
  const report = {
    version: REPORT_SCHEMA_VERSION, ...metadata, timestamp: metadata.runTimestamp,
    inputZip: path.resolve(options.inputZip), set: options.set, strict: options.strict, verdict: "BLOCKED",
    summary: { requiredScreens: 0, detectedScreens: 0, missingScreens: 0, errors: 1, warnings: 0, exactDuplicates: 0, nearDuplicates: 0 },
    artifactManifest: null, screens: [],
    inventory: { set: options.set, required: [], detected: [], missing: [], unrecognized: [], duplicates: [] },
    duplicates: [],
    findings: [{ id: "F-001", screenId: null, severity: "error", category: "blocked", message: "Audit could not complete", evidence: [error instanceof Error ? error.message : String(error)], ruleId: "audit.blocked" }],
    artifacts: { reportJson: reportJsonPath, reportMarkdown: reportMarkdownPath, contactSheet: null, extractedText: path.join(outputDirectory, "extracted-text.json"), screenInventory: path.join(outputDirectory, "screen-inventory.json"), normalizedDirectory: path.join(outputDirectory, "normalized") },
  };
  await writeFile(report.artifacts.extractedText, "[]\n", "utf8");
  await writeFile(report.artifacts.screenInventory, `${JSON.stringify(report.inventory, null, 2)}\n`, "utf8");
  await writeMarkdownReport(reportMarkdownPath, report);
  await writeJsonReport(reportJsonPath, report);
  return report;
}
