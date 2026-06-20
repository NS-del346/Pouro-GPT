import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { createZip, extractZipSafely } from "../src/zip.js";

function replaceAll(buffer, from, to) {
  const output = Buffer.from(buffer);
  let offset = 0;
  while ((offset = output.indexOf(from, offset)) >= 0) {
    to.copy(output, offset);
    offset += to.length;
  }
  return output;
}

test("rejects traversal, absolute paths, and symbolic links", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "stitch-zip-test-"));
  try {
    const safe = createZip([{ name: "safe.txt", data: "x" }]);
    const archives = [
      ["traversal.zip", replaceAll(safe, Buffer.from("safe.txt"), Buffer.from("../x.txt")), /Unsafe ZIP entry path/u],
      ["absolute.zip", replaceAll(safe, Buffer.from("safe.txt"), Buffer.from("C:/x.txt")), /Unsafe ZIP entry path/u],
      ["symlink.zip", createZip([{ name: "link.txt", data: "target", mode: 0o120777 }]), /Symbolic links are not allowed/u],
    ];
    for (const [name, archive, expression] of archives) {
      const file = path.join(directory, name);
      await writeFile(file, archive);
      await assert.rejects(() => extractZipSafely(file, path.join(directory, `${name}-out`)), expression);
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
