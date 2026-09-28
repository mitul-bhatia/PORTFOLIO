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

test('mood ink, muted, and accent contrast on paper', () => {
  const css = readFileSync(cssPath, 'utf8');
  const moods: Array<[string, string]> = [];
  for (const match of css.matchAll(/html\[data-mood='([^']+)'\]\s*\{([^}]+)\}/g)) {
    moods.push([match[1], match[2]]);
  }

  assert.equal(moods.length, 8);

  for (const [name, block] of moods) {
    const paper = pick(block, 'paper');
    const ink = pick(block, 'ink');
    const muted = pick(block, 'muted');
    const accent = pick(block, 'accent');
    const accentInk = pick(block, 'accent-ink');

    assert.ok(contrast(ink, paper) >= 4.5, `${name} ink/paper`);
    assert.ok(contrast(muted, paper) >= 4.5, `${name} muted/paper`);
    assert.ok(contrast(accentInk, paper) >= 4.5, `${name} accent-ink/paper`);
    assert.ok(contrast(accent, paper) >= 3, `${name} accent/paper`);
  }
});
