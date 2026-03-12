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
              src="/images/logo/bizim-qida-logo.png"
              alt="Bizim Qida"
              className={styles['logo-img']}
            />
            <div className={styles['logo-text-wrap']}>
              <div className={styles['logo-name']}>Bizim Qida</div>
              <div className={styles['logo-sub']}>Dağıtım MMC</div>
            </div>
          </div>
          <p>{t('description')}</p>
        </div>

        {/* Corporate Column */}
        <div className={styles['foot-col']}>
          <h5>{t('corporateTitle')}</h5>
          <Link href="/about">{t('aboutUs')}</Link>
          <Link href="/board-message">{t('boardMessage')}</Link>
          <Link href="/management">{t('management')}</Link>
          <Link href="/news">{t('news')}</Link>
        </div>

        {/* Services Column */}
        <div className={styles['foot-col']}>
          <h5>{t('servicesTitle')}</h5>
          <Link href="/distribution">{t('distribution')}</Link>
          <Link href="/brands">{t('brands')}</Link>
          <Link href="/services">{t('logistics')}</Link>
          <Link href="/career">{t('career')}</Link>
        </div>

        {/* Contact Column */}
        <div className={styles['foot-col']}>
          <h5>{t('contactTitle')}</h5>
          <a href="mailto:info@bizimqida.az">info@bizimqida.az</a>
          <a href="tel:+99436000000">+994 36 XXX XX XX</a>
          <a href="https://www.surkit.com.tr" target="_blank" rel="noopener noreferrer">surkit.com.tr</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <div className={styles['footer-bottom']}>
        <p>&copy; 2025 Bizim Qida &mdash; {t('copyright')}</p>
        <div className={styles['surkit-ref']}>
          <span>S&uuml;rkit Holding</span>
          &nbsp;&middot;&nbsp;
          {t('subsidiary')}
        </div>
      </div>
    </footer>
  );
}
