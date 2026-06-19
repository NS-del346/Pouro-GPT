import { describe, expect, it } from "vitest";

import { extractVisibleTextFromHtml } from "../src/html-text.js";

describe("HTML text extraction", () => {
  const extraction = extractVisibleTextFromHtml(
    `<html><body><h1>レシピ ２０ｇ / ３００ｇ</h1><p>0:45 と 1:15</p><button aria-label="保存">保存</button><script>18g 2:45</script><span hidden>93°C</span></body></html>`,
    "fixture",
  );

  it("extracts gram values and normalizes full-width digits", () => {
    expect(extraction.grams).toEqual(expect.arrayContaining(["20g", "300g"]));
    expect(extraction.grams).not.toContain("18g");
  });

  it("extracts time values", () => {
    expect(extraction.times).toEqual(expect.arrayContaining(["0:45", "1:15"]));
    expect(extraction.times).not.toContain("2:45");
  });

  it("extracts ratio values", () => {
    expect(extraction.ratios).toContain("1:15");
  });

  it("captures visible controls and ignores hidden content", () => {
    expect(extraction.buttons).toContain("保存 保存");
    expect(extraction.temperatures).not.toContain("93°C");
  });
});
