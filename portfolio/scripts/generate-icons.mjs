import { writeFile } from 'node:fs/promises';
import { deflateSync } from 'node:zlib';

const publicDir = new URL('../public/', import.meta.url);
const bg = [245, 239, 242, 255];
const primary = [116, 71, 81, 255];
const secondary = [177, 142, 150, 255];

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});

function crc32(buffer) {
  let value = 0xffffffff;
  for (const byte of buffer) value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function pointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function setPixel(pixels, size, x, y, color) {
  if (x < 0 || y < 0 || x >= size || y >= size) return;
  const index = (y * size + x) * 4;
  pixels[index] = color[0];
  pixels[index + 1] = color[1];
  pixels[index + 2] = color[2];
  pixels[index + 3] = color[3];
}

function drawRect(pixels, size, x, y, width, height, color) {
  for (let row = y; row < y + height; row += 1) {
    for (let col = x; col < x + width; col += 1) setPixel(pixels, size, col, row, color);
  }
}

function drawPoly(pixels, size, polygon, color) {
  const xs = polygon.map(([x]) => x);
  const ys = polygon.map(([, y]) => y);
  const minX = Math.floor(Math.min(...xs));
  const maxX = Math.ceil(Math.max(...xs));
  const minY = Math.floor(Math.min(...ys));
  const maxY = Math.ceil(Math.max(...ys));
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      if (pointInPolygon(x + 0.5, y + 0.5, polygon)) setPixel(pixels, size, x, y, color);
    }
  }
}

function createPng(size) {
  const pixels = Buffer.alloc(size * size * 4);
  for (let index = 0; index < pixels.length; index += 4) {
    pixels[index] = bg[0];
    pixels[index + 1] = bg[1];
    pixels[index + 2] = bg[2];
    pixels[index + 3] = bg[3];
  }

  const scale = size / 48;
  const rect = (x, y, width, height, color) => drawRect(
    pixels,
    size,
    Math.round(x * scale),
    Math.round(y * scale),
    Math.round(width * scale),
    Math.round(height * scale),
    color,
  );
  const poly = (points, color) => drawPoly(pixels, size, points.map(([x, y]) => [x * scale, y * scale]), color);

  rect(9, 12, 10, 25, primary);
  rect(29, 7, 10, 35, primary);
  rect(19, 22, 10, 10, primary);
  poly([[19, 7], [29, 12], [19, 17]], primary);
  poly([[19, 32], [29, 27], [29, 42]], primary);
  poly([[19, 22], [29, 17], [29, 27], [19, 32]], secondary);

  const rows = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) pixels.copy(rows, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(rows)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function createIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const directory = Buffer.alloc(16);
  directory[0] = 48;
  directory[1] = 48;
  directory[2] = 0;
  directory[3] = 0;
  directory.writeUInt16LE(1, 4);
  directory.writeUInt16LE(32, 6);
  directory.writeUInt32LE(png.length, 8);
  directory.writeUInt32LE(header.length + directory.length, 12);

  return Buffer.concat([header, directory, png]);
}

const faviconPng = createPng(48);
await writeFile(new URL('favicon-48x48.png', publicDir), createPng(48));
await writeFile(new URL('apple-touch-icon.png', publicDir), createPng(180));
await writeFile(new URL('favicon.ico', publicDir), createIco(faviconPng));
