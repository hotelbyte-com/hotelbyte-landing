// Converts our own prerendered HTML to search chunks. This is HTML transport
// parsing, not intent classification or product rules. No runtime scraping.
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
export function pageText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) throw new Error('knowledge page has no main content');
  return main[1]
    .replace(/<(script|style|svg|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/(?:p|div|section|h[1-6]|li|pre|article)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, key) => {
      if (key[0] !== '#') return entities[key.toLowerCase()] ?? entity;
      const code = key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10);
      return code <= 0x10ffff ? String.fromCodePoint(code) : entity;
    })
    .split('\n').map(line => line.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
}

export function pageChunks({ html, path, locale, key, title }) {
  const text = pageText(html);
  if (text.length < 100) throw new Error(`knowledge page too small: ${path}`);
  // Bound each indexed document without dropping the end of long client lists.
  const parts = [];
  let part = '';
  for (const line of text.split('\n')) {
    for (let offset = 0; offset < line.length; offset += 1800) {
      const piece = line.slice(offset, offset + 1800);
      if (part && part.length + piece.length > 1800) { parts.push(part); part = ''; }
      part += `${piece}\n`;
    }
  }
  if (part) parts.push(part);
  return parts.map((body, index) => ({
    id: `pages/${locale}/${key}/${index + 1}`, locale, kind: 'page', slug: key, title,
    content: `# ${title}\nSource: https://hotelbyte.com${path}\n\n${body.trim()}`,
  }));
}
