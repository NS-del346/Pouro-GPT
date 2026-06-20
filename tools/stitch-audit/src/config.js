import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configDirectory = path.join(rootDirectory, "config");

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

export function loadScreenManifest() {
  return readJson(path.join(configDirectory, "screen-manifest.json"));
}

export function loadRecipeTruthConfig() {
  return readJson(path.join(configDirectory, "recipe-truth-rules.json"));
}

export function loadForbiddenCopyConfig() {
  return readJson(path.join(configDirectory, "forbidden-copy.json"));
}

export async function loadToolVersion() {
  return (await readJson(path.join(rootDirectory, "package.json"))).version;
}
