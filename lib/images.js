/* Reads image width/height straight from files in public/ (build time only),
   so layouts know whether a photo is portrait or landscape. */
import fs from "node:fs";
import path from "node:path";

const cache = new Map();

function readSize(buf) {
  if (buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG") return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    if (kind === "VP8L") { const n = buf.readUInt32LE(21); return { w: 1 + (n & 0x3fff), h: 1 + ((n >> 14) & 0x3fff) }; }
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const m = buf[i + 1];
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(m))
        return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

/** dims("assets/images/x.jpg") → { w, h } (falls back to 16:9) */
export function dims(rel) {
  if (!rel || /^https?:/.test(rel)) return { w: 1600, h: 900 };
  if (!cache.has(rel)) {
    const file = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    if (!fs.existsSync(file)) throw new Error(`Missing image: public/${rel} — check the path in data/content.js`);
    cache.set(rel, readSize(fs.readFileSync(file)) || { w: 1600, h: 900 });
  }
  return cache.get(rel);
}
