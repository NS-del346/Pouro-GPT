import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { deflateRawSync, inflateRawSync } from "node:zlib";

import { crc32 } from "./crc32.js";

const LOCAL_FILE = 0x04034b50;
const CENTRAL_FILE = 0x02014b50;
const END_OF_CENTRAL_DIRECTORY = 0x06054b50;

function findEndOfCentralDirectory(buffer) {
  const first = Math.max(0, buffer.length - 65_557);
  for (let offset = buffer.length - 22; offset >= first; offset -= 1) {
    if (buffer.readUInt32LE(offset) === END_OF_CENTRAL_DIRECTORY) {
      return offset;
    }
  }
  throw new Error("Invalid ZIP: end-of-central-directory record is missing");
}

export function normalizeZipEntryName(entryName) {
  const unixPath = entryName.replaceAll("\\", "/");
  if (
    !unixPath ||
    unixPath.includes("\0") ||
    unixPath.startsWith("/") ||
    /^[a-z]:/iu.test(unixPath)
  ) {
    throw new Error(`Unsafe ZIP entry path: ${entryName}`);
  }

  const parts = unixPath.split("/");
  if (parts.some((part) => part === "..")) {
    throw new Error(`Unsafe ZIP entry path: ${entryName}`);
  }
  const normalized = path.posix.normalize(unixPath);
  if (normalized === ".." || normalized.startsWith("../")) {
    throw new Error(`Unsafe ZIP entry path: ${entryName}`);
  }
  return normalized.replace(/^\.\//u, "");
}

export function readZipEntries(buffer) {
  const endOffset = findEndOfCentralDirectory(buffer);
  const disk = buffer.readUInt16LE(endOffset + 4);
  const centralDisk = buffer.readUInt16LE(endOffset + 6);
  const entryCount = buffer.readUInt16LE(endOffset + 10);
  const centralSize = buffer.readUInt32LE(endOffset + 12);
  const centralOffset = buffer.readUInt32LE(endOffset + 16);
  if (disk !== 0 || centralDisk !== 0 || entryCount === 0xffff) {
    throw new Error("Unsupported ZIP: multi-disk and ZIP64 archives are not accepted");
  }
  if (centralOffset + centralSize > endOffset) {
    throw new Error("Invalid ZIP: central directory is outside the archive bounds");
  }

  const entries = [];
  const names = new Set();
  let offset = centralOffset;
  for (let index = 0; index < entryCount; index += 1) {
    if (offset + 46 > buffer.length || buffer.readUInt32LE(offset) !== CENTRAL_FILE) {
      throw new Error("Invalid ZIP: malformed central-directory entry");
    }
    const versionMadeBy = buffer.readUInt16LE(offset + 4);
    const flags = buffer.readUInt16LE(offset + 8);
    const method = buffer.readUInt16LE(offset + 10);
    const expectedCrc = buffer.readUInt32LE(offset + 16);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const uncompressedSize = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const externalAttributes = buffer.readUInt32LE(offset + 38);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const end = offset + 46 + nameLength + extraLength + commentLength;
    if (end > buffer.length) {
      throw new Error("Invalid ZIP: truncated central-directory entry");
    }
    const encoding = (flags & 0x0800) !== 0 ? "utf8" : "latin1";
    const rawName = buffer.subarray(offset + 46, offset + 46 + nameLength).toString(encoding);
    const name = normalizeZipEntryName(rawName);
    if (names.has(name)) {
      throw new Error(`Duplicate ZIP entry: ${name}`);
    }
    names.add(name);
    if ((flags & 0x0001) !== 0) {
      throw new Error(`Encrypted ZIP entries are not allowed: ${name}`);
    }
    if (![0, 8].includes(method)) {
      throw new Error(`Unsupported ZIP compression method ${method}: ${name}`);
    }
    const unixMode = (externalAttributes >>> 16) & 0xffff;
    const hostSystem = versionMadeBy >>> 8;
    if ((unixMode & 0xf000) === 0xa000 || (hostSystem === 3 && (unixMode & 0xf000) === 0xa000)) {
      throw new Error(`Symbolic links are not allowed in Stitch ZIPs: ${name}`);
    }
    if (name.toLowerCase().endsWith(".zip")) {
      throw new Error(`Nested ZIP files are not allowed: ${name}`);
    }
    if (localOffset + 30 > buffer.length || buffer.readUInt32LE(localOffset) !== LOCAL_FILE) {
      throw new Error(`Invalid ZIP local header: ${name}`);
    }
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataOffset = localOffset + 30 + localNameLength + localExtraLength;
    const dataEnd = dataOffset + compressedSize;
    if (dataEnd > buffer.length) {
      throw new Error(`Invalid ZIP: truncated file data for ${name}`);
    }
    const compressed = buffer.subarray(dataOffset, dataEnd);
    const data = method === 0 ? Buffer.from(compressed) : inflateRawSync(compressed);
    if (data.length !== uncompressedSize || crc32(data) !== expectedCrc) {
      throw new Error(`Corrupt ZIP entry: ${name}`);
    }
    entries.push({ name, data, directory: name.endsWith("/") });
    offset = end;
  }
  return entries;
}

export async function extractZipSafely(zipPath, outputDirectory) {
  const entries = readZipEntries(await readFile(zipPath));
  const root = path.resolve(outputDirectory);
  await mkdir(root, { recursive: true });
  for (const entry of entries) {
    const destination = path.resolve(root, ...entry.name.split("/").filter(Boolean));
    const relative = path.relative(root, destination);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error(`ZIP entry escapes extraction directory: ${entry.name}`);
    }
    if (entry.directory) {
      await mkdir(destination, { recursive: true });
      continue;
    }
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, entry.data);
  }
  return entries.map((entry) => entry.name);
}

export function createZip(entries) {
  const localParts = [];
  const centralParts = [];
  let localOffset = 0;
  for (const entry of entries) {
    const name = normalizeZipEntryName(entry.name);
    const nameBuffer = Buffer.from(name, "utf8");
    const data = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data ?? "");
    const method = entry.method ?? 8;
    const compressed = method === 0 ? data : deflateRawSync(data, { level: 9 });
    const checksum = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(LOCAL_FILE, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuffer.length, 26);
    localParts.push(local, nameBuffer, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(CENTRAL_FILE, 0);
    central.writeUInt16LE((3 << 8) | 20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(method, 10);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuffer.length, 28);
    const mode = entry.mode ?? (name.endsWith("/") ? 0o040755 : 0o100644);
    central.writeUInt32LE((mode << 16) >>> 0, 38);
    central.writeUInt32LE(localOffset, 42);
    centralParts.push(central, nameBuffer);
    localOffset += local.length + nameBuffer.length + compressed.length;
  }
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(END_OF_CENTRAL_DIRECTORY, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(localOffset, 16);
  return Buffer.concat([...localParts, centralDirectory, end]);
}
