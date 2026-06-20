import { artifactKey, expectedScreensForSet } from "./artifact-manifest.js";

export function canonicalStateIds(config) {
  return [...new Set(config.screens.map((screen) => screen.stateId))];
}

export function requiredArtifactKeys(config, set) {
  return expectedScreensForSet(config, set).map((screen) =>
    artifactKey(screen.stateId, screen.expectedViewport.width, screen.expectedViewport.height));
}

export function minimumViewportStateIds(config, width = 375, height = 667) {
  return config.screens
    .filter((screen) => screen.expectedViewport.width === width && screen.expectedViewport.height === height)
    .map((screen) => screen.stateId);
}

export function buildInventory(detected, config, set) {
  const required = requiredArtifactKeys(config, set);
  const present = new Set(detected.map((screen) => screen.key));
  const requiredSet = new Set(required);
  return {
    set,
    required,
    detected: detected.map((screen) => ({
      key: screen.key,
      stateId: screen.stateId,
      fileName: screen.fileName,
      expectedViewport: { width: screen.expectedWidth, height: screen.expectedHeight },
    })),
    missing: required.filter((key) => !present.has(key)),
    unrecognized: detected.filter((screen) => !requiredSet.has(screen.key)).map((screen) => screen.key),
    duplicates: [],
  };
}
