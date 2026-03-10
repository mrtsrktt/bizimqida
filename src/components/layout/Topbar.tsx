'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import styles from './Topbar.module.css';

const locales = ['tr', 'az', 'en', 'ru'] as const;

export default function Topbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className={styles.topbar}>
      <div className={styles['topbar-inner']}>
        <div className={styles['topbar-left']}>
          <a href="mailto:info@bizimqida.az">&#9993; info@bizimqida.az</a>
          <a href="tel:+99436000000">&#9742; +994 36 XXX XX XX</a>
        </div>
        <div className={styles['topbar-right']}>
          <div className={styles['topbar-social']}>
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="Instagram">ig</a>
            <a href="#" title="Facebook">fb</a>
          </div>
          <div className={styles['lang-switcher']}>
            {locales.map((loc) => (
              <button
                key={loc}
                className={`${styles['lang-btn']}${locale === loc ? ` ${styles.active}` : ''}`}
                onClick={() => switchLocale(loc)}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
