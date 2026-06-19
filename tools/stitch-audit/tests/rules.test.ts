import { beforeAll, describe, expect, it } from "vitest";

import { loadForbiddenCopyConfig, loadRecipeTruthConfig } from "../src/config.js";
import { extractVisibleTextFromHtml } from "../src/html-text.js";
import { evaluateForbiddenCopy, evaluateRecipeTruth } from "../src/rules.js";
import type { ForbiddenCopyConfig, RecipeTruthConfig } from "../src/types.js";

let recipeTruth: RecipeTruthConfig;
let forbiddenCopy: ForbiddenCopyConfig;

beforeAll(async () => {
  [recipeTruth, forbiddenCopy] = await Promise.all([
    loadRecipeTruthConfig(),
    loadForbiddenCopyConfig(),
  ]);
});

function extract(screenId: string, text: string) {
  return extractVisibleTextFromHtml(`<main>${text}</main>`, screenId);
}

describe("Recipe Truth rules", () => {
  it("rejects 18g on the 4:6 pouring screen", () => {
    const findings = evaluateRecipeTruth("active-brew-pouring", extract("active-brew-pouring", "18g 60 / 300g 0:45 1 / 4"), "set-a", recipeTruth);
    expect(findings.some((finding) => finding.evidence.includes("grams: 18g"))).toBe(true);
  });

  it("rejects step 1 / 5 on the 4:6 pouring screen", () => {
    const findings = evaluateRecipeTruth("active-brew-pouring", extract("active-brew-pouring", "60g 60 / 300g 0:45 1 / 5"), "set-a", recipeTruth);
    expect(findings.some((finding) => finding.evidence.includes("sequences: 1 / 5"))).toBe(true);
  });

  it("reports Hybrid when 3:00 is missing", () => {
    const text = "20g 300g 1:15 64g / 64g / 172g 0:00 0:30 1:15 1:45 OPEN CLOSED";
    const findings = evaluateRecipeTruth("recipe-setup-hybrid", extract("recipe-setup-hybrid", text), "set-a", recipeTruth);
    expect(findings.some((finding) => finding.evidence.includes("times: 3:00"))).toBe(true);
  });

  it("reports Ice when 30g × 5 is missing", () => {
    const text = "20g HOT 150g ICE 80g 3:00 HOTの累計目標は150g ICEはセット済み";
    const findings = evaluateRecipeTruth("recipe-setup-ice-brew", extract("recipe-setup-ice-brew", text), "set-a", recipeTruth);
    expect(findings.some((finding) => finding.evidence.some((item) => item.includes("30g × 5")))).toBe(true);
  });

  it("rejects Finish wrong values and source-heavy naming", () => {
    const text = "4:6 18g 250g 1:15 V60 Light Roast 92°C 2:45";
    const findings = evaluateRecipeTruth("finish-unsaved", extract("finish-unsaved", text), "set-a", recipeTruth);
    expect(findings.some((finding) => finding.evidence.includes("grams: 18g"))).toBe(true);
    expect(findings.some((finding) => finding.evidence.includes("temperatures: 92°C"))).toBe(true);
    expect(findings.some((finding) => finding.evidence.includes("text: V60 Light Roast"))).toBe(true);
  });

  it("rejects cloud implication in a local save state", () => {
    const text = "4:6 20g 300g 1:15 60 / 60 / 90 / 90 cloud sync";
    const extracted = extract("finish-saving", text);
    const findings = [
      ...evaluateRecipeTruth("finish-saving", extracted, "set-a", recipeTruth),
      ...evaluateForbiddenCopy("finish-saving", extracted, forbiddenCopy),
    ];
    expect(findings.some((finding) => finding.ruleId === "copy.cloud-implication")).toBe(true);
  });
});

describe("Forbidden copy", () => {
  it("rejects invented device behavior on fallback", () => {
    const findings = evaluateForbiddenCopy(
      "active-brew-fallback",
      extract("active-brew-fallback", "maximum extraction 600ml establishing connection"),
      forbiddenCopy,
    );
    expect(findings.some((finding) => finding.ruleId === "copy.invented-device-behavior" && finding.severity === "error")).toBe(true);
  });

  it("warns on English-primary operational copy", () => {
    const findings = evaluateForbiddenCopy("active-brew-idle", extract("active-brew-idle", "READY TO BREW"), forbiddenCopy);
    expect(findings.some((finding) => finding.ruleId === "copy.english-primary-operational" && finding.severity === "warning")).toBe(true);
  });

  it("does not treat allowed 10 Pour and Pourō names as a POUR control", () => {
    const findings = evaluateForbiddenCopy(
      "home-empty",
      extract("home-empty", "Pourō 4:6 Hybrid 10 Pour Ice Brew"),
      forbiddenCopy,
    );
    expect(findings.some((finding) => finding.ruleId === "copy.english-primary-operational")).toBe(false);
  });
});
