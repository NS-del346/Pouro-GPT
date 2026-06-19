import { readFile } from "node:fs/promises";

import { load } from "cheerio";

import type { ExtractedText } from "./types.js";

export function normalizeText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u00a0\u2000-\u200b\u2028\u2029\u3000]/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function unique(values: string[]): string[] {
  return [...new Set(values.map(normalizeText).filter(Boolean))];
}

function matches(source: string, expression: RegExp, capture = 0): string[] {
  const values: string[] = [];
  for (const match of source.matchAll(expression)) {
    const value = match[capture];
    if (value) {
      values.push(normalizeText(value).replace(/\s+/gu, ""));
    }
  }
  return unique(values);
}

function removeHiddenContent($: ReturnType<typeof load>): void {
  $("script, style, noscript, template, input[type='hidden'], [hidden], [aria-hidden='true'], .hidden").remove();
  $("*").each((_index, element) => {
    const style = ($(element).attr("style") ?? "").toLocaleLowerCase("en-US");
    if (/display\s*:\s*none|visibility\s*:\s*hidden/u.test(style)) {
      $(element).remove();
    }
  });
}

function collectTextNodes($: ReturnType<typeof load>): string[] {
  const values: string[] = [];
  const walk = (node: any): void => {
    if (node.type === "text") {
      const value = normalizeText(node.data ?? "");
      if (value) {
        values.push(value);
      }
      return;
    }
    for (const child of node.children ?? []) {
      walk(child);
    }
  };

  const roots = $("body").length > 0 ? $("body").contents().toArray() : $.root().contents().toArray();
  roots.forEach(walk);
  return values;
}

function attributeValues($: ReturnType<typeof load>): string[] {
  const values: string[] = [];
  for (const attribute of ["placeholder", "aria-label", "title", "alt"] as const) {
    $(`[${attribute}]`).each((_index, element) => {
      const value = normalizeText($(element).attr(attribute) ?? "");
      if (value) {
        values.push(value);
      }
    });
  }
  return values;
}

function selectedElementText(
  $: ReturnType<typeof load>,
  selector: string,
): string[] {
  const values: string[] = [];
  $(selector).each((_index, element) => {
    const content = normalizeText(
      [
        $(element).text(),
        $(element).attr("aria-label"),
        $(element).attr("title"),
        $(element).attr("value"),
      ]
        .filter(Boolean)
        .join(" "),
    );
    if (content) {
      values.push(content);
    }
  });
  return unique(values);
}

export function extractVisibleTextFromHtml(
  html: string,
  screenId: string,
): ExtractedText {
  const $ = load(html);
  removeHiddenContent($);

  const visibleText = unique([...collectTextNodes($), ...attributeValues($)]);
  const normalizedText = normalizeText(visibleText.join(" "));

  return {
    screenId,
    visibleText,
    grams: matches(normalizedText, /[+-]?\d+(?:\.\d+)?\s*g\b/giu),
    times: matches(normalizedText, /(?:^|[^\d])(\d{1,2}\s*:\s*\d{2})(?!\d)/gu, 1),
    ratios: matches(normalizedText, /(?:^|[^\d])(\d+\s*:\s*\d+(?:\.\d+)?)(?!\d)/gu, 1),
    temperatures: matches(normalizedText, /\d+(?:\.\d+)?\s*°\s*C\b/giu),
    buttons: selectedElementText(
      $,
      "button, [role='button'], input[type='button'], input[type='submit']",
    ),
    headings: selectedElementText($, "h1, h2, h3, h4, h5, h6, [role='heading']"),
    numbers: matches(normalizedText, /(?:^|[^\d])(\d+(?:\.\d+)?)(?!\d)/gu, 1),
    normalizedText,
  };
}

export async function extractVisibleText(
  htmlPath: string,
  screenId: string,
): Promise<ExtractedText> {
  return extractVisibleTextFromHtml(await readFile(htmlPath, "utf8"), screenId);
}
