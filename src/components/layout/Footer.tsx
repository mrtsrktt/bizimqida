'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-grid']}>
        {/* Brand Column */}
        <div className={styles['footer-brand']}>
          <div className={styles['nav-logo']}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/bizim-qida-logo.svg"
              alt="Bizim Qida"
              className={styles['logo-img']}
            />
          </div>
          <p>{t('description')}</p>
        </div>

        {/* Corporate Column */}
        <div className={styles['foot-col']}>
          <h5>{t('corporateTitle')}</h5>
          <Link href="/about">{t('aboutUs')}</Link>
          <Link href="/management">{t('management')}</Link>
        </div>

        {/* Services Column */}
        <div className={styles['foot-col']}>
          <h5>{t('servicesTitle')}</h5>
          <Link href="/distribution">{t('distribution')}</Link>
          <Link href="/brands">{t('brands')}</Link>
          <Link href="/services">{t('logistics')}</Link>
        </div>

        {/* Contact Column */}
        <div className={styles['foot-col']}>
          <h5>{t('contactTitle')}</h5>
          <a href="mailto:info@surkit.com.tr">info@surkit.com.tr</a>
          <a href="tel:+994365513038">+994 36 551 30 38</a>
          <a href="https://www.surkit.com.tr" target="_blank" rel="noopener noreferrer">surkit.com.tr</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <div className={styles['footer-bottom']}>
        <p>&copy; 2025 Bizim Qida &mdash; {t('copyright')}</p>
        <a href="https://www.surkit.com.tr" target="_blank" rel="noopener noreferrer" className={styles['surkit-ref']}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/surkit-logo.png"
            alt="Sürkit Holding"
            className={styles['surkit-logo']}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className={styles['surkit-label']} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>{t('subsidiary')}</span>
        </a>
      </div>
    </footer>
  );
}
