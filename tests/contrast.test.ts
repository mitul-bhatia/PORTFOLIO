import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const cssPath = join(dirname(fileURLToPath(import.meta.url)), '../src/app/globals.css');

function channel(value: number) {
  const scaled = value / 255;
  return scaled <= 0.04045 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const red = channel(parseInt(hex.slice(1, 3), 16));
  const green = channel(parseInt(hex.slice(3, 5), 16));
  const blue = channel(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(first: string, second: string) {
  const lighter = Math.max(luminance(first), luminance(second));
  const darker = Math.min(luminance(first), luminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

function pick(block: string, name: string) {
  const match = block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  assert.ok(match, `missing --${name}`);
  return match[1].toLowerCase();
}

test('text colours hold AA contrast on their grounds', () => {
  const css = readFileSync(cssPath, 'utf8');
  const root = css.match(/:root\s*\{([^}]+)\}/);
  assert.ok(root, 'missing :root tokens');
  const block = root[1];

  const paper = pick(block, 'paper');
  const panel = pick(block, 'paper-soft');
  const ink = pick(block, 'ink');

  for (const ground of [paper, panel]) {
    assert.ok(contrast(ink, ground) >= 4.5, `ink on ${ground}`);
    for (const name of ['muted', 'red-ink', 'blue-ink', 'green-ink', 'yellow-ink']) {
      assert.ok(contrast(pick(block, name), ground) >= 4.5, `${name} on ${ground}`);
    }
  }

  // Text set on a line colour.
  for (const name of ['red', 'blue', 'green']) {
    assert.ok(contrast('#ffffff', pick(block, name)) >= 4.5, `white on ${name}`);
  }
  assert.ok(contrast(ink, pick(block, 'yellow')) >= 4.5, 'ink on yellow');
  assert.ok(contrast(pick(block, 'yellow'), ink) >= 4.5, 'yellow on ink');

  // Line strokes must read against the paper.
  for (const name of ['red', 'blue', 'green']) {
    assert.ok(contrast(pick(block, name), paper) >= 3, `${name} stroke on paper`);
  }
});
