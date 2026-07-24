'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './NewsGrid.module.css';

export interface HoldingNewsItem {
  id?: string;
  badge: string;
  title: string;
  description: string;
  images: string[];
  imageLabel?: string;
  imageCaption?: string;
  portrait?: boolean;
  href?: string;
}

interface Props {
  apiNews: HoldingNewsItem[] | null;
  locale?: string;
}

export default function NewsGridClient({ apiNews, locale = 'tr' }: Props) {
  const t = useTranslations('news');
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const defaultItems = [
    {
      id: 'news-1',
      tag: t('news1Tag'),
      title: t('news1Title'),
      description:
        'Sürkit Holding bünyesinde Nahçıvan merkezli kurulan modern gıda depolama ve soğuk zincir lojistik tesisi faaliyete geçti.',
      date: 'Mart 2025',
      image: '/images/facility/exterior-loading-docks.jpg',
      portrait: false,
      href: `https://surkit.com.tr/${locale}/basin-odasi`,
    },
    {
      id: 'news-2',
      tag: t('news3Tag'),
      title: t('news3Title'),
      description:
        'Gıda güvenliği ve ürün tazeliğini korumak amacıyla filoya yeni soğutmalı araçlar eklendi.',
      date: 'Ocak 2025',
      image: '/images/warehouse/interior-tall-racks-b.jpg',
      portrait: false,
      href: `https://surkit.com.tr/${locale}/basin-odasi`,
    },
  ];

  const items =
    apiNews && apiNews.length > 0
      ? apiNews.map((item, index) => {
          const rawHref = item.href || `https://surkit.com.tr/${locale}/basin-odasi#haber-${index}`;
          const href =
            typeof window !== 'undefined' && window.location.hostname === 'localhost'
              ? rawHref.replace('https://surkit.com.tr', 'http://localhost:3001')
              : rawHref;

          return {
            id: item.id || `news-${index}`,
            tag: item.imageLabel || item.badge || 'Sürkit Holding',
            title: item.title,
            description: item.description,
            date: item.badge,
            image: item.images[0] || '/images/facility/exterior-loading-docks.jpg',
            portrait: item.portrait || false,
            href,
          };
        })
      : defaultItems;

  const total = items.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
  };

  const currentItem = items[activeIndex] || items[0];
  const basinOdasiUrl =
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? `http://localhost:3001/${locale}/basin-odasi`
      : `https://surkit.com.tr/${locale}/basin-odasi`;

  return (
    <section className={styles.newsSection}>
      <div className="section-inner">
        <RevealOnScroll>
          <div className={styles.newsHeader}>
            <div className={styles.newsHeaderLeft}>
              <div className={styles.newsHeaderBadge}>
                <span className={styles.livePulse} />
                <span>{t('badge')}</span>
              </div>
              <h2 className="section-h">
                {t('title')} <em>{t('titleEmphasis')}</em>
              </h2>
              <p className={styles.newsSubDesc}>{t('subDesc')}</p>
            </div>

            <div className={styles.newsHeaderRightActions}>
              <a
                href={basinOdasiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.allNewsBtn}
              >
                <span>{t('viewAll')}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              {/* NAV ARROWS */}
              <div className={styles.arrowNav}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={handlePrev}
                  aria-label="Önceki haber"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <span className={styles.navCounter}>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={handleNext}
                  aria-label="Sonraki haber"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* SINGLE FEATURED NEWS CARD SLIDER */}
        <RevealOnScroll>
          <div
            className={styles.singleCardWrapper}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <a
              key={activeIndex}
              href={currentItem.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.singleCard} ${styles.singleCardAnim}`}
            >
              {/* LEFT / TOP IMAGE AREA */}
              <div className={styles.singleImgWrapper}>
                {currentItem.portrait ? (
                  <>
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      fill
                      unoptimized={currentItem.image.startsWith('http')}
                      className={styles.ncImgBlurBg}
                    />
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      fill
                      unoptimized={currentItem.image.startsWith('http')}
                      className={styles.ncImgContain}
                    />
                  </>
                ) : (
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    unoptimized={currentItem.image.startsWith('http')}
                    className={styles.ncImg}
                  />
                )}
                <span className={styles.ntagBadge}>{currentItem.tag}</span>
              </div>

              {/* RIGHT / BOTTOM CONTENT AREA */}
              <div className={styles.singleContent}>
                <div className={styles.singleMeta}>
                  <span className={styles.singleDate}>{currentItem.date}</span>
                </div>

                <h3 className={styles.singleTitle}>{currentItem.title}</h3>

                {currentItem.description && (
                  <p className={styles.singleDesc}>{currentItem.description}</p>
                )}

                <div className={styles.singleFooter}>
                  <span className={styles.singleCtaBtn}>
                    <span>{t('readMore')}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            {/* FLOATING SIDE NAV BUTTONS */}
            <button
              type="button"
              className={`${styles.sideNavBtn} ${styles.sideNavPrev}`}
              onClick={(e) => {
                e.preventDefault();
                handlePrev();
              }}
              aria-label="Önceki haber"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.sideNavBtn} ${styles.sideNavNext}`}
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              aria-label="Sonraki haber"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* DOT INDICATORS */}
          <div className={styles.dotsNav}>
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Haber ${idx + 1}`}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
