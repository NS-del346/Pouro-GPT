import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import type {
  ForbiddenCopyConfig,
  RecipeTruthConfig,
  ScreenManifest,
} from "./types.js";

const configDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../config",
);

async function readJson<T>(fileName: string): Promise<T> {
  return JSON.parse(
    await readFile(path.join(configDirectory, fileName), "utf8"),
  ) as T;
}

export function loadScreenManifest(): Promise<ScreenManifest> {
  return readJson<ScreenManifest>("screen-manifest.json");
}

export function loadRecipeTruthConfig(): Promise<RecipeTruthConfig> {
  return readJson<RecipeTruthConfig>("recipe-truth-rules.json");
}

export function loadForbiddenCopyConfig(): Promise<ForbiddenCopyConfig> {
  return readJson<ForbiddenCopyConfig>("forbidden-copy.json");
}
