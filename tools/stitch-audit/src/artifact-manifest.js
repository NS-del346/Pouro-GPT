import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const REQUIRED_SCREEN_FIELDS = [
  "stateId", "fileName", "expectedWidth", "expectedHeight", "methodId", "variantId",
  "recipeTruthSummary", "sourceStatus", "verificationLevel", "knownGaps",
];

function finding(ruleId, message, evidence = [], screenId = null) {
  return { screenId, severity: "error", category: "artifact-manifest", message, evidence, ruleId };
}

export function artifactKey(stateId, width, height) {
  return `${stateId}__${width}x${height}`;
}

export function expectedScreensForSet(config, set) {
  return config.screens.filter((screen) => set === "all" || screen.sets.includes(set));
}

async function walkFiles(root, relative = "") {
  const files = [];
  const entries = await readdir(path.join(root, relative), { withFileTypes: true });
  for (const entry of entries) {
    const child = path.posix.join(relative.replaceAll("\\", "/"), entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(root, child));
    else if (entry.isFile()) files.push(child);
    else files.push(child);
  }
  return files.sort();
}

export async function readArtifactManifest(extractionRoot) {
  const filePath = path.join(extractionRoot, "manifest.json");
  try {
    return { manifest: JSON.parse(await readFile(filePath, "utf8")), findings: [] };
  } catch (error) {
    const code = error?.code;
    const message = code === "ENOENT" ? "Required ZIP-root manifest.json is missing" : "ZIP-root manifest.json is invalid JSON";
    return { manifest: null, findings: [finding("manifest.required", message, [error instanceof Error ? error.message : String(error)])] };
  }
}

export async function validateArtifactManifest(extractionRoot, artifactManifest, config, set, strict) {
  const findings = [];
  const detected = [];
  if (!artifactManifest || typeof artifactManifest !== "object" || Array.isArray(artifactManifest)) {
    return { findings, detected, files: await walkFiles(extractionRoot) };
  }
  for (const field of ["project", "setId", "generatedAt", "sourceAuthorityIds", "artifactStatus", "screens"]) {
    if (!(field in artifactManifest)) findings.push(finding("manifest.required-field", `Required manifest field is missing: ${field}`, [field]));
  }
  if (artifactManifest.project !== "NS-del346/Pouro-GPT") {
    findings.push(finding("manifest.project", "Manifest project does not identify NS-del346/Pouro-GPT", [String(artifactManifest.project)]));
  }
  if (artifactManifest.setId !== set && set !== "all") {
    findings.push(finding("manifest.set-id", "Manifest setId does not match the requested audit set", [`manifest=${artifactManifest.setId}`, `audit=${set}`]));
  }
  if (typeof artifactManifest.generatedAt !== "string" || !Number.isFinite(Date.parse(artifactManifest.generatedAt))) {
    findings.push(finding("manifest.generated-at", "Manifest generatedAt must be an ISO date-time", [String(artifactManifest.generatedAt)]));
  }
  if (!Array.isArray(artifactManifest.sourceAuthorityIds) || artifactManifest.sourceAuthorityIds.some((id) => typeof id !== "string")) {
    findings.push(finding("manifest.authorities", "Manifest sourceAuthorityIds must be a string array"));
  } else {
    for (const authorityId of config.sourceAuthorityIds) {
      if (!artifactManifest.sourceAuthorityIds.includes(authorityId)) {
        findings.push(finding("manifest.authority-required", "Manifest omits a required source Authority", [authorityId]));
      }
    }
  }
  if (typeof artifactManifest.artifactStatus !== "string" || !artifactManifest.artifactStatus.trim()) {
    findings.push(finding("manifest.artifact-status", "Manifest artifactStatus must be a non-empty string"));
  }
  if (!Array.isArray(artifactManifest.screens)) {
    findings.push(finding("manifest.screens", "Manifest screens must be an array"));
    return { findings, detected, files: await walkFiles(extractionRoot) };
  }

  const configByKey = new Map(config.screens.map((screen) => [artifactKey(screen.stateId, screen.expectedViewport.width, screen.expectedViewport.height), screen]));
  const seenKeys = new Set();
  const seenFiles = new Set();
  for (const [index, screen] of artifactManifest.screens.entries()) {
    if (!screen || typeof screen !== "object" || Array.isArray(screen)) {
      findings.push(finding("manifest.screen-object", `Manifest screen ${index} must be an object`));
      continue;
    }
    for (const field of REQUIRED_SCREEN_FIELDS) {
      if (!(field in screen)) findings.push(finding("manifest.screen-required-field", `Manifest screen field is missing: ${field}`, [`index=${index}`], screen.stateId ?? null));
    }
    const width = screen.expectedWidth;
    const height = screen.expectedHeight;
    const stateId = screen.stateId;
    if (typeof stateId !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(stateId)) {
      findings.push(finding("manifest.state-id", "stateId must be a canonical lowercase kebab-case ID", [String(stateId)]));
      continue;
    }
    if (!Number.isInteger(width) || width < 1 || !Number.isInteger(height) || height < 1) {
      findings.push(finding("manifest.viewport", "expectedWidth and expectedHeight must be positive integers", [String(width), String(height)], stateId));
      continue;
    }
    const key = artifactKey(stateId, width, height);
    if (seenKeys.has(key)) findings.push(finding("manifest.duplicate-state", "Duplicate stateId and viewport in artifact manifest", [key], stateId));
    seenKeys.add(key);
    if (typeof screen.fileName !== "string" || path.posix.basename(screen.fileName) !== screen.fileName) {
      findings.push(finding("manifest.filename", "fileName must be a filename without a path", [String(screen.fileName)], stateId));
    } else {
      const canonicalFileName = `${key}.png`;
      if (screen.fileName !== canonicalFileName) {
        findings.push(finding("manifest.filename-contract", "PNG filename violates <state-id>__<width>x<height>.png", [`expected=${canonicalFileName}`, `actual=${screen.fileName}`], stateId));
      }
      if (seenFiles.has(screen.fileName)) findings.push(finding("manifest.duplicate-filename", "Duplicate PNG filename in artifact manifest", [screen.fileName], stateId));
      seenFiles.add(screen.fileName);
    }
    if (typeof screen.htmlFileName !== "string" || screen.htmlFileName !== `${key}.html`) {
      findings.push(finding("manifest.html-filename", "htmlFileName must match <state-id>__<width>x<height>.html", [String(screen.htmlFileName)], stateId));
    } else {
      if (seenFiles.has(screen.htmlFileName)) findings.push(finding("manifest.duplicate-filename", "Duplicate HTML filename in artifact manifest", [screen.htmlFileName], stateId));
      seenFiles.add(screen.htmlFileName);
    }
    if (!Array.isArray(screen.knownGaps) || screen.knownGaps.some((gap) => typeof gap !== "string")) {
      findings.push(finding("manifest.known-gaps", "knownGaps must be a string array", [], stateId));
    }
    if (!["string", "object"].includes(typeof screen.recipeTruthSummary) || screen.recipeTruthSummary === null || Array.isArray(screen.recipeTruthSummary)) {
      findings.push(finding("manifest.recipe-truth-summary", "recipeTruthSummary must be a string or object", [], stateId));
    }
    if (![null, "string"].includes(screen.methodId === null ? null : typeof screen.methodId) ||
        ![null, "string"].includes(screen.variantId === null ? null : typeof screen.variantId)) {
      findings.push(finding("manifest.method-variant", "methodId and variantId must be strings or null", [], stateId));
    }
    if (typeof screen.sourceStatus !== "string" || !screen.sourceStatus.trim() || typeof screen.verificationLevel !== "string" || !screen.verificationLevel.trim()) {
      findings.push(finding("manifest.provenance", "sourceStatus and verificationLevel must be non-empty strings", [], stateId));
    }
    if ((stateId === "setup-unsupported" || stateId === "brew-fallback") && screen.recipeTruthSummary?.runnable === true) {
      findings.push(finding("manifest.unsupported-runnable", "Unsupported/fallback state must not declare a runnable schedule", [key], stateId));
    }
    const configured = configByKey.get(key);
    if (!configured) {
      findings.push(finding("manifest.unsupported-state", "Artifact manifest contains an unsupported state/viewport", [key], stateId));
    } else if (screen.fileName !== configured.fileName) {
      findings.push(finding("manifest.config-filename", "Artifact filename does not match the configured canonical filename", [`configured=${configured.fileName}`, `manifest=${screen.fileName}`], stateId));
    }
    detected.push({ ...screen, key, configured: configured ?? null });
  }

  const expected = expectedScreensForSet(config, set);
  for (const screen of expected) {
    const key = artifactKey(screen.stateId, screen.expectedViewport.width, screen.expectedViewport.height);
    if (!seenKeys.has(key)) findings.push(finding("manifest.required-screen", `Required artifact is missing from manifest: ${key}`, [screen.fileName], screen.stateId));
  }
  const files = await walkFiles(extractionRoot);
  const declaredPaths = new Set(["manifest.json"]);
  for (const screen of detected) {
    if (typeof screen.fileName === "string") declaredPaths.add(`screens/${screen.fileName}`);
    if (typeof screen.htmlFileName === "string") declaredPaths.add(`screens/${screen.htmlFileName}`);
  }
  for (const declared of declaredPaths) {
    if (!files.includes(declared)) findings.push(finding("manifest.file-missing", `Manifest-declared file does not exist: ${declared}`, [declared]));
  }
  for (const file of files) {
    if (!declaredPaths.has(file)) findings.push(finding("manifest.file-extra", `ZIP file is not declared by manifest: ${file}`, [file]));
  }
  if (strict && files.some((file) => file.startsWith("__MACOSX/") || path.posix.basename(file).startsWith("."))) {
    findings.push(finding("manifest.hidden-file", "Hidden/OS metadata files are not allowed in strict mode"));
  }
  return { findings, detected, files };
}
