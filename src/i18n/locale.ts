export type Locale = 'zh' | 'en';

export const localeStorageKey = 'hb-locale';

export function detectBrowserLocale(languages?: readonly string[]): Locale {
  const candidates = languages !== undefined
    ? languages
    : typeof navigator !== 'undefined'
      ? [...(navigator.languages || []), navigator.language]
      : [];

  for (const raw of candidates) {
    const normalized = raw?.trim().toLowerCase();
    if (!normalized) {
      continue;
    }
    if (normalized.startsWith('zh')) {
      return 'zh';
    }
    if (normalized.startsWith('en')) {
      return 'en';
    }
  }

  return 'zh';
}
