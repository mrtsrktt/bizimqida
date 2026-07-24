'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { FlagIcon } from '@/components/ui/FlagIcon';
import styles from './LangDropdown.module.css';

const localesConfig = [
  { code: 'tr', label: 'TR', name: 'Türkçe' },
  { code: 'az', label: 'AZ', name: 'Azərbaycan' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
] as const;

export default function LangDropdown({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = localesConfig.find((l) => l.code === locale) || localesConfig[0];

  function switchLocale(newLocale: string) {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`${styles.langWrap} ${dark ? styles.darkTheme : ''}`} ref={dropdownRef}>
      <button
        type="button"
        className={styles.activeBtn}
        onClick={() => setOpen(!open)}
        aria-label="Language selector"
      >
        <FlagIcon locale={activeLang.code} />
        <span className={styles.langLabel}>{activeLang.label}</span>
        <svg
          className={`${styles.arrowIcon} ${open ? styles.arrowOpen : ''}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          {localesConfig.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`${styles.dropdownOption} ${locale === item.code ? styles.selectedOption : ''}`}
              onClick={() => switchLocale(item.code)}
            >
              <FlagIcon locale={item.code} />
              <span className={styles.optionName}>{item.name}</span>
              <span className={styles.optionCode}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
