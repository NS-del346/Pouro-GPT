import assert from "node:assert/strict";
import test from "node:test";

import { loadForbiddenCopyConfig, loadRecipeTruthConfig } from "../src/config.js";
import { extractVisibleTextFromHtml } from "../src/html-text.js";
import { evaluateForbiddenCopy, evaluateRecipeTruth } from "../src/rules.js";

const [recipeTruth, forbiddenCopy] = await Promise.all([loadRecipeTruthConfig(), loadForbiddenCopyConfig()]);
const extract = (screenId, text) => extractVisibleTextFromHtml(`<main>${text}</main>`, screenId);

test("Recipe Truth fixed examples pass on canonical setup IDs", () => {
  const fixtures = [
    ["setup-four-six", "R-01 R-02 R-03 20g 300g 1:15 60 / 60 / 90 / 90 50 / 70 / 90 / 90 70 / 50 / 90 / 90"],
    ["setup-hybrid", "20g 300g 1:15 64g / 64g / 172g 0:00 0:30 1:15 1:45 3:00 OPEN CLOSED"],
    ["setup-ten-pour", "20g 300g 1:15 30g × 10 1:45 210g 2:30 3:30"],
    ["setup-ice-brew", "20g HOT 150g ICE 80g 30g × 5 3:00 HOTの累計目標は150g ICEはセット済み"],
  ];
  for (const [stateId, text] of fixtures) {
    const errors = evaluateRecipeTruth(stateId, extract(stateId, text), "set-a", recipeTruth).filter((finding) => finding.severity === "error");
    assert.deepEqual(errors, [], `${stateId} should match Document 10 fixed examples`);
  }
});

test("rejects wrong 4:6 pouring values", () => {
  const findings = evaluateRecipeTruth("brew-pouring", extract("brew-pouring", "18g 60 / 300g 0:45 1 / 5"), "set-a", recipeTruth);
  assert.ok(findings.some((finding) => finding.evidence.includes("grams: 18g")));
  assert.ok(findings.some((finding) => finding.evidence.includes("sequences: 1 / 5")));
});

test("rejects missing Hybrid and Ice fixed-example fields", () => {
  const hybrid = evaluateRecipeTruth("setup-hybrid", extract("setup-hybrid", "20g 300g 1:15 64g / 64g / 172g 0:00 0:30 1:15 1:45 OPEN CLOSED"), "set-a", recipeTruth);
  assert.ok(hybrid.some((finding) => finding.evidence.includes("times: 3:00")));
  const ice = evaluateRecipeTruth("setup-ice-brew", extract("setup-ice-brew", "20g HOT 150g ICE 80g 3:00 HOTの累計目標は150g ICEはセット済み"), "set-a", recipeTruth);
  assert.ok(ice.some((finding) => finding.evidence.some((item) => item.includes("30g × 5"))));
});

test("rejects forbidden device and cloud claims", () => {
  const fallback = evaluateForbiddenCopy("brew-fallback", extract("brew-fallback", "maximum extraction 600ml establishing connection"), forbiddenCopy);
  assert.ok(fallback.some((finding) => finding.ruleId === "copy.invented-device-behavior" && finding.severity === "error"));
  const cloud = evaluateForbiddenCopy("finish-saving", extract("finish-saving", "cloud sync account backup"), forbiddenCopy);
  assert.ok(cloud.some((finding) => finding.ruleId === "copy.cloud-implication"));
});
