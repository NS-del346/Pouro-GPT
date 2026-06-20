import assert from "node:assert/strict";
import test from "node:test";

import { extractVisibleTextFromHtml } from "../src/html-text.js";

test("extracts normalized visible HTML and ignores hidden content", () => {
  const extraction = extractVisibleTextFromHtml(
    `<html><body><h1>レシピ ２０ｇ / ３００ｇ</h1><p>0:45 と 1:15</p><button aria-label="保存">保存</button><script>18g 2:45</script><span hidden>93°C</span></body></html>`,
    "fixture",
  );
  assert.ok(extraction.grams.includes("20g"));
  assert.ok(extraction.grams.includes("300g"));
  assert.ok(!extraction.grams.includes("18g"));
  assert.ok(extraction.times.includes("0:45"));
  assert.ok(extraction.times.includes("1:15"));
  assert.ok(!extraction.times.includes("2:45"));
  assert.ok(extraction.ratios.includes("1:15"));
  assert.ok(extraction.buttons.some((value) => value.includes("保存")));
  assert.ok(!extraction.temperatures.includes("93°C"));
});
