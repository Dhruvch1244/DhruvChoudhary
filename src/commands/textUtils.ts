/** Draws a Unicode box around a block of lines, padding every line to equal width
 * so the border always aligns regardless of content length. */
export function boxLines(lines: string[], padding = 2): string[] {
  const width = Math.max(...lines.map((l) => l.length));
  const pad = ' '.repeat(padding);
  const top = `╔${'═'.repeat(width + padding * 2)}╗`;
  const bottom = `╚${'═'.repeat(width + padding * 2)}╝`;
  const body = lines.map((l) => `║${pad}${l}${' '.repeat(width - l.length)}${pad}║`);
  return [top, ...body, bottom];
}

export function padRight(text: string, width: number): string {
  return text.length >= width ? text : text + ' '.repeat(width - text.length);
}

/** Simple two-column key/value table, left column padded to align the separator. */
export function table(rows: [string, string][]): string[] {
  const keyWidth = Math.max(...rows.map(([k]) => k.length));
  return rows.map(([k, v]) => `  ${padRight(k, keyWidth)}  ${v}`);
}
