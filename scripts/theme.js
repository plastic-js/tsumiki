import * as readline from 'node:readline';
import { stdin, stdout } from 'node:process';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'src', 'styles');

const COLOR_HEX = {
  amber: '#ffb224', blue: '#0091ff', bronze: '#a18072',
  brown: '#ad7f58', crimson: '#e93d82', cyan: '#00a2c7',
  gold: '#978365', grass: '#46a758', green: '#30a46c',
  indigo: '#3e63dd', iris: '#5b5bd6', jade: '#29a383',
  lime: '#99d52a', mint: '#86ead4', orange: '#f76b15',
  pink: '#d6409f', plum: '#ab4aba', purple: '#8e4ec6',
  red: '#e5484d', ruby: '#e54666', sky: '#7ce2fe',
  teal: '#12a594', tomato: '#e54d2e', violet: '#6e56cf',
  yellow: '#ffe629',
};

const GRAY = ['gray', 'mauve', 'olive', 'sage', 'sand', 'slate'];

const GRAY_HEX = {
  gray: '#8d8d8d', mauve: '#8e8c99', olive: '#898e87',
  sage: '#868e8b', sand: '#8d8d86', slate: '#889096',
};

const B = '\x1b[1m';
const D = '\x1b[2m';
const R = '\x1b[0m';

function hexToRgb(h) {
  const v = parseInt(h.slice(1), 16);
  return { r: (v >> 16) & 0xff, g: (v >> 8) & 0xff, b: v & 0xff };
}

function F(h) { const { r, g, b } = hexToRgb(h); return `\x1b[38;2;${r};${g};${b}m`; }
function FG(s) { return `${F('#30a46c')}${s}${R}`; }

function colorName(s) {
  const h = COLOR_HEX[s] || GRAY_HEX[s] || '#888';
  return `${F(h)}${s}${R}`;
}

function colorSwatch(s, w) {
  const h = COLOR_HEX[s] || GRAY_HEX[s] || '#888';
  const bar = '\u2588'.repeat(w);
  return `${F(h)}${bar}${R} ${F(h)}${s}${R}  ${D}${h}${R}`;
}

function padList(items, cols, colorize) {
  const maxLen = Math.max(...items.map((s) => s.length));
  const out = [];
  for (let i = 0; i < items.length; i += cols) {
    const row = [];
    for (let j = 0; j < cols && i + j < items.length; j++) {
      const s = items[i + j];
      const num = `${D}${String(i + j + 1).padStart(2)}${R}`;
      if (colorize) {
        const pad = ' '.repeat(maxLen - s.length + 2);
        row.push(`  ${num} ${colorName(s)}${pad}`);
      } else {
        row.push(`  ${num} ${s.padEnd(maxLen + 2)}`);
      }
    }
    out.push(row.join(''));
  }
  return out.join('\n');
}

function preview(accent, gray) {
  const bar = '\u2588'.repeat(14);
  return [
    `\n  ${B}Preview${R}`,
    `    Accent  ${F(COLOR_HEX[accent])}${bar}  ${accent}  ${COLOR_HEX[accent]}${R}`,
    `    Gray    ${F(GRAY_HEX[gray])}${bar}  ${gray}  ${GRAY_HEX[gray]}${R}`,
    '',
  ].join('\n');
}

function ask(rl, p) {
  return new Promise((resolve) => rl.question(p, resolve));
}

async function pick(rl, label, options) {
  console.log(`\n  ${B}${label}${R}\n`);
  console.log(padList(options, 5, true));
  console.log('');
  while (true) {
    const a = (await ask(rl, `  ${D}Pick by number or name [1]:${R} `)).trim();
    if (a === '') return 0;
    const n = Number(a);
    if (n >= 1 && n <= options.length) return n - 1;
    const idx = options.findIndex((o) => o.toLowerCase() === a.toLowerCase());
    if (idx !== -1) return idx;
    console.log(`  ${F('#e5484d')}\u2717${R} "${a}" — not found\n`);
  }
}

function generateTheme(accent, gray) {
  const imports = [
    `@import '@radix-ui/colors/${accent}.css';`,
    `@import '@radix-ui/colors/${accent}-alpha.css';`,
    `@import '@radix-ui/colors/${gray}.css';`,
    `@import '@radix-ui/colors/${gray}-alpha.css';`,
    `@import '@radix-ui/colors/${accent}-dark.css';`,
    `@import '@radix-ui/colors/${accent}-dark-alpha.css';`,
    `@import '@radix-ui/colors/${gray}-dark.css';`,
    `@import '@radix-ui/colors/${gray}-dark-alpha.css';`,
  ];

  const av = Array.from({ length: 12 }, (_, i) =>
    `  --tsu-accent-${i + 1}: var(--${accent}-${i + 1});`
  );
  const nv = Array.from({ length: 12 }, (_, i) =>
    `  --tsu-neutral-${i + 1}: var(--${gray}-${i + 1});`
  );

  return `${imports.join('\n')}

:root {
  /* Accent (${accent}) */
${av.join('\n')}

  /* Neutral (${gray}) */
${nv.join('\n')}
}
`;
}

async function main() {
  console.log('');
  console.log(`  ${B}${F('#0091ff')}T${F('#40a9ff')}s${F('#69c0ff')}u${F('#91d5ff')}m${F('#bae7ff')}i${F('#d6efff')}k${F('#e6f7ff')}i${R} ${B}Theme Generator${R}`);
  console.log(`  ${D}Generate CSS theme tokens by picking accent & gray colors${R}`);

  const rl = readline.createInterface({ input: stdin, output: stdout });

  const ai = await pick(rl, '\uD83C\uDFA8  Accent Color', Object.keys(COLOR_HEX));
  const accent = Object.keys(COLOR_HEX)[ai];
  console.log(`  ${FG('\u2713')} Accent: ${colorSwatch(accent, 8)}`);

  const gi = await pick(rl, '\u2B1C  Gray Color', GRAY);
  const gray = GRAY[gi];
  console.log(`  ${FG('\u2713')} Gray:   ${colorSwatch(gray, 8)}`);

  console.log(preview(accent, gray));

  const a = (await ask(rl, `  ${B}Write to theme.css?${R} ${D}[Y/n]${R}: `)).trim().toLowerCase();
  rl.close();

  if (a !== '' && a !== 'y' && a !== 'yes') {
    console.log(`\n  ${D}Aborted.${R}\n`);
    return;
  }

  const content = generateTheme(accent, gray);
  const outPath = resolve(OUT_DIR, 'theme.css');
  writeFileSync(outPath, content, 'utf-8');

  console.log(`\n  ${FG('\u2713')} ${B}theme.css${R} generated`);
  console.log(`    ${D}${outPath}${R}\n`);
}

main();
