import assert from "node:assert/strict";
import test from "node:test";

import { loadScreenManifest } from "../src/config.js";
import { canonicalStateIds, minimumViewportStateIds, requiredArtifactKeys } from "../src/inventory.js";

test("uses the current canonical state IDs and no replaced IDs", async () => {
  const config = await loadScreenManifest();
  const ids = canonicalStateIds(config);
  for (const id of ["setup-four-six", "setup-hybrid", "setup-ten-pour", "setup-ice-brew", "setup-unsupported", "brew-idle", "brew-pouring", "brew-waiting", "brew-paused", "brew-transition", "brew-drawdown", "brew-completed", "brew-fallback", "finish-save-my-recipe"]) {
    assert.ok(ids.includes(id), `missing canonical ID ${id}`);
  }
  for (const id of ["recipe-setup-four-six", "active-brew-waiting", "finish-save-as-my-recipe"]) {
    assert.ok(!ids.includes(id), `legacy ID must not be canonical: ${id}`);
  }
});

test("contains the complete eight-state 375x667 matrix without ID suffixes", async () => {
  const config = await loadScreenManifest();
  assert.deepEqual(minimumViewportStateIds(config), [
    "home-previous-brew", "setup-four-six", "setup-unsupported", "brew-pouring",
    "brew-waiting", "brew-paused", "finish-unsaved", "settings-data",
  ]);
  const keys = requiredArtifactKeys(config, "set-a");
  assert.ok(keys.includes("brew-waiting__375x667"));
  assert.ok(!canonicalStateIds(config).some((id) => id.endsWith("-375x667")));
  assert.equal(config.defaultDimensionTolerance, 0);
});
