'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navbarClass = `${styles.navbar}${scrolled ? ` ${styles.scrolled}` : ''}`;

  return (
    <nav className={navbarClass}>
      <div className={styles['nav-inner']}>
        {/* Logo */}
        <Link href="/" className={styles['nav-logo']}>
          <Image
            src="/images/logo/bizim-qida-logo.png"
            alt="Bizim Qida"
            width={180}
            height={50}
            className={styles['logo-img']}
            priority
          />
          <div className={styles['logo-text-wrap']}>
            <div className={styles['logo-name']}>Bizim Qida</div>
            <div className={styles['logo-sub']}>Dağıtım MMC</div>
          </div>
        </Link>

        {/* Desktop Nav Menu */}
        <ul className={styles['nav-menu']}>
          {/* Corporate Dropdown */}
          <li className={styles['nav-item']}>
            <span className={styles['nav-link']}>
              {t('corporate')}
              <svg viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <ul className={styles.dropdown}>
              <li>
                <Link href="/about">{t('aboutUs')}</Link>
              </li>
              <li>
                <Link href="/board-message">{t('boardMessage')}</Link>
              </li>
              <li>
                <Link href="/management">{t('management')}</Link>
              </li>
              <li>
                <Link href="/news">{t('news')}</Link>
              </li>
            </ul>
          </li>

          {/* Services */}
          <li className={styles['nav-item']}>
            <Link href="/services" className={styles['nav-link']}>
              {t('services')}
            </Link>
          </li>

          {/* Brands */}
          <li className={styles['nav-item']}>
            <Link href="/brands" className={styles['nav-link']}>
              {t('brands')}
            </Link>
          </li>

          {/* Distribution */}
          <li className={styles['nav-item']}>
            <Link href="/distribution" className={styles['nav-link']}>
              {t('distribution')}
            </Link>
          </li>

          {/* Career */}
          <li className={styles['nav-item']}>
            <Link href="/career" className={styles['nav-link']}>
              {t('career')}
            </Link>
          </li>

          {/* Apply */}
          <li className={styles['nav-item']}>
            <Link href="/apply" className={styles['nav-link']}>
              {t('apply')}
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <Link href="/contact" className={styles['nav-cta']}>
          {t('contact')}
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className={`${styles.hamburger}${mobileOpen ? ` ${styles.open}` : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles['mobile-menu']}${mobileOpen ? ` ${styles.open}` : ''}`}>
        <Link href="/about" onClick={() => setMobileOpen(false)}>
          {t('aboutUs')}
        </Link>
        <Link href="/board-message" onClick={() => setMobileOpen(false)}>
          {t('boardMessage')}
        </Link>
        <Link href="/management" onClick={() => setMobileOpen(false)}>
          {t('management')}
        </Link>
        <Link href="/news" onClick={() => setMobileOpen(false)}>
          {t('news')}
        </Link>
        <Link href="/services" onClick={() => setMobileOpen(false)}>
          {t('services')}
        </Link>
        <Link href="/brands" onClick={() => setMobileOpen(false)}>
          {t('brands')}
        </Link>
        <Link href="/distribution" onClick={() => setMobileOpen(false)}>
          {t('distribution')}
        </Link>
        <Link href="/career" onClick={() => setMobileOpen(false)}>
          {t('career')}
        </Link>
        <Link href="/apply" onClick={() => setMobileOpen(false)}>
          {t('apply')}
        </Link>
        <Link href="/contact" className={styles['mobile-cta']} onClick={() => setMobileOpen(false)}>
          {t('contact')}
        </Link>
      </div>
    </nav>
  );
}
