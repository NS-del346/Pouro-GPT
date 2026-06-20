import { readFile } from "node:fs/promises";

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const HIDDEN_TAGS = new Set(["script", "style", "noscript", "template"]);

export function normalizeText(value) {
  return String(value)
    .normalize("NFKC")
    .replace(/[\u00a0\u2000-\u200b\u2028\u2029\u3000]/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function decodeEntities(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/giu, (_match, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return named[entity.toLowerCase()] ?? _match;
  });
}

function attributesFrom(tag) {
  const attributes = new Map();
  for (const match of tag.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gu)) {
    const name = match[1].toLowerCase();
    if (!name.startsWith("<")) attributes.set(name, decodeEntities(match[2] ?? match[3] ?? match[4] ?? ""));
  }
  return attributes;
}

function unique(values) {
  return [...new Set(values.map(normalizeText).filter(Boolean))];
}

function matches(source, expression, capture = 0) {
  const values = [];
  for (const match of source.matchAll(expression)) {
    if (match[capture]) values.push(normalizeText(match[capture]).replace(/\s+/gu, ""));
  }
  return unique(values);
}

function parseVisibleHtml(html) {
  const visibleText = [];
  const buttons = [];
  const headings = [];
  const stack = [{ tag: "#root", hidden: false, button: false, heading: false, collected: [] }];
  const tokens = html.replace(/<!--[\s\S]*?-->/gu, "").match(/<[^>]*>|[^<]+/gu) ?? [];
  for (const token of tokens) {
    if (!token.startsWith("<")) {
      const frame = stack.at(-1);
      if (!frame.hidden) {
        const text = normalizeText(decodeEntities(token));
        if (text) {
          visibleText.push(text);
          for (const ancestor of stack) {
            if (ancestor.button || ancestor.heading) ancestor.collected.push(text);
          }
        }
      }
      continue;
    }
    if (/^<\s*\//u.test(token)) {
      if (stack.length > 1) {
        const frame = stack.pop();
        const content = normalizeText(frame.collected.join(" "));
        if (frame.button && content) buttons.push(content);
        if (frame.heading && content) headings.push(content);
      }
      continue;
    }
    if (/^<\s*[!?]/u.test(token)) continue;
    const tag = /^<\s*([^\s/>]+)/u.exec(token)?.[1]?.toLowerCase();
    if (!tag) continue;
    const attributes = attributesFrom(token);
    const parentHidden = stack.at(-1).hidden;
    const style = (attributes.get("style") ?? "").toLowerCase();
    const classes = (attributes.get("class") ?? "").split(/\s+/u);
    const hidden = parentHidden || HIDDEN_TAGS.has(tag) || attributes.has("hidden") ||
      attributes.get("aria-hidden")?.toLowerCase() === "true" || classes.includes("hidden") ||
      /display\s*:\s*none|visibility\s*:\s*hidden/u.test(style);
    const role = attributes.get("role")?.toLowerCase();
    const type = attributes.get("type")?.toLowerCase();
    const button = !hidden && (tag === "button" || role === "button" || (tag === "input" && ["button", "submit"].includes(type)));
    const heading = !hidden && (/^h[1-6]$/u.test(tag) || role === "heading");
    if (!hidden) {
      for (const name of ["placeholder", "aria-label", "title", "alt"]) {
        const value = normalizeText(attributes.get(name) ?? "");
        if (value) visibleText.push(value);
      }
      const controlValue = normalizeText([attributes.get("aria-label"), attributes.get("title"), attributes.get("value")].filter(Boolean).join(" "));
      if (button && controlValue) buttons.push(controlValue);
      if (heading && controlValue) headings.push(controlValue);
    }
    if (!VOID_TAGS.has(tag) && !/\/\s*>$/u.test(token)) {
      stack.push({ tag, hidden, button, heading, collected: [] });
    }
  }
  return { visibleText: unique(visibleText), buttons: unique(buttons), headings: unique(headings) };
}

export function extractVisibleTextFromHtml(html, screenId) {
  const parsed = parseVisibleHtml(html);
  const normalizedText = normalizeText(parsed.visibleText.join(" "));
  return {
    screenId,
    visibleText: parsed.visibleText,
    grams: matches(normalizedText, /[+-]?\d+(?:\.\d+)?\s*g\b/giu),
    times: matches(normalizedText, /(?:^|[^\d])(\d{1,2}\s*:\s*\d{2})(?!\d)/gu, 1),
    ratios: matches(normalizedText, /(?:^|[^\d])(\d+\s*:\s*\d+(?:\.\d+)?)(?!\d)/gu, 1),
    temperatures: matches(normalizedText, /\d+(?:\.\d+)?\s*°\s*C\b/giu),
    buttons: parsed.buttons,
    headings: parsed.headings,
    numbers: matches(normalizedText, /(?:^|[^\d])(\d+(?:\.\d+)?)(?!\d)/gu, 1),
    normalizedText,
  };
}

export async function extractVisibleText(htmlPath, screenId) {
  return extractVisibleTextFromHtml(await readFile(htmlPath, "utf8"), screenId);
}
