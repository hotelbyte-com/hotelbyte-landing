import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { type Locale } from '../i18n';

const localeFlags: Record<Locale, string> = {
  en: '🇬🇧', zh: '🇨🇳', hi: '🇮🇳', es: '🇪🇸', fr: '🇫🇷',
  ar: '🇸🇦', pt: '🇵🇹', de: '🇩🇪', tr: '🇹🇷',
  fil: '🇵🇭', he: '🇮🇱',
};

const localeNames: Record<Locale, string> = {
  en: 'English', zh: '中文', hi: 'हिन्दी', es: 'Español', fr: 'Français',
  ar: 'العربية', pt: 'Português', de: 'Deutsch', tr: 'Türkçe',
  fil: 'Filipino', he: 'עברית',
};

interface LanguageMenuProps {
  locales: readonly Locale[];
  current: Locale;
  chooseLabel: string;
  onChange: (locale: Locale) => void;
}

/**
 * Flag + native-name language picker: pill trigger, rounded popover listing
 * every published locale with its flag. Rows navigate via onChange; the menu
 * closes on outside pointer-down, Escape, or focus leaving the wrapper.
 */
export default function LanguageMenu({ locales, current, chooseLabel, onChange }: LanguageMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={chooseLabel}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/80 hover:border-ink/40 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-brass"
      >
        <span className="text-base leading-none" aria-hidden="true">{localeFlags[current]}</span>
        <span>{localeNames[current]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-ink/50 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div role="listbox" aria-label={chooseLabel}
          className="absolute top-full right-0 mt-2 w-44 max-h-[70vh] overflow-y-auto rounded-xl border border-line bg-white shadow-xl py-1.5 z-50">
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={code === current}
              onClick={() => { setOpen(false); onChange(code); }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-left hover:bg-paper-raised focus-visible:outline-2 focus-visible:outline-brass ${code === current ? 'font-medium text-ink' : 'text-ink/70'}`}
            >
              <span className="text-base leading-none w-5 text-center" aria-hidden="true">{localeFlags[code]}</span>
              <span className="flex-1">{localeNames[code]}</span>
              {code === current && <Check className="w-4 h-4 text-brass" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
