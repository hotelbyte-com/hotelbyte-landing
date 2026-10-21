// Converts our own prerendered HTML to search chunks. This is HTML transport
// parsing, not intent classification or product rules. No runtime scraping.
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
export function pageText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) throw new Error('knowledge page has no main content');
  return main[1]
    .replace(/<(script|style|svg|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<pre\b[^>]*>/gi, '\n```\n').replace(/<\/pre>/gi, '\n```\n')
    .replace(/<h([1-6])\b[^>]*>/gi, (_tag, level) => `\n${'#'.repeat(Number(level))} `)
    .replace(/<\/(?:p|div|section|h[1-6]|li|article)>|<br\s*\/?>/gi, '\n')
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
  // Code comments are not headings. Only split outside the fenced HTML pre.
  const sections = [];
  let section = [], inCode = false;
  for (const line of text.split('\n')) {
    if (!inCode && /^#{1,6} /.test(line) && section.length) { sections.push(section); section = []; }
    section.push(line);
    if (line === '```') inCode = !inCode;
  }
  if (section.length) sections.push(section);

  // Keep a named section intact when it fits. Continued long sections carry
  // their heading ancestry and balanced code fences, so each hit has a subject.
  const limit = 1800, parts = [], headings = [];
  let part = '';
  const flush = () => { if (part.trim()) parts.push(part.trim()); part = ''; };
  for (const lines of sections) {
    const match = /^(#{1,6}) /.exec(lines[0]);
    const level = match?.[1].length ?? 0;
    if (level) { headings.length = level; headings[level - 1] = lines[0]; }
    const parents = headings.slice(0, level ? level - 1 : headings.length).filter(Boolean).join('\n');
    const prefix = [parents, level ? lines[0] : ''].filter(Boolean).join('\n') + '\n';
    const body = lines.join('\n');
    if ((part ? part.length : parents.length + 1) + body.length + 1 <= limit) {
      if (!part && parents) part = `${parents}\n`;
      part += `${body}\n`;
      continue;
    }
    flush();
    if (prefix.length > limit / 2) throw new Error(`knowledge heading ancestry too long: ${path}`);
    part = prefix;
    let codeOpen = false;
    const width = limit - prefix.length - 9;
    for (const line of level ? lines.slice(1) : lines) {
      for (let offset = 0; offset < line.length; offset += width) {
        const piece = line.slice(offset, offset + width);
        const nextCode = line === '```' ? !codeOpen : codeOpen;
        if (part.length + piece.length + 1 + (nextCode ? 4 : 0) > limit) {
          if (codeOpen) part += '```\n';
          flush();
          part = prefix + (codeOpen ? '```\n' : '');
        }
        part += `${piece}\n`;
        codeOpen = nextCode;
      }
    }
  }
  flush();
  return parts.map((body, index) => ({
    id: `pages/${locale}/${key}/${index + 1}`, locale, kind: 'page', slug: key, title,
    content: `# ${title}\nSource: https://hotelbyte.com${path}\n\n${body}`,
  }));
}
