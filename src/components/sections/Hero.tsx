'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CountUp from '@/components/animations/CountUp';
import styles from './Hero.module.css';

const heroSlides = [
  '/images/facility/exterior-front-wide.jpg',
  '/images/facility/exterior-loading-docks.jpg',
  '/images/warehouse/interior-workers.jpg',
];

export default function Hero() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const goNext = useCallback(() => {
    setPrev(current);
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, [current]);

  useEffect(() => {
    const id = setInterval(goNext, 4000);
    return () => clearInterval(id);
  }, [goNext]);

  // Clear prev after transition ends
  useEffect(() => {
    if (prev === null) return;
    const id = setTimeout(() => setPrev(null), 800);
    return () => clearTimeout(id);
  }, [prev]);

  return (
    <section className={styles.hero}>
      {/* Background slideshow */}
      <div className={styles.slideshow}>
        {heroSlides.map((src, i) => (
          <div
            key={src}
            className={`${styles.slide} ${
              i === current ? styles.slideActive : ''
            } ${i === prev ? styles.slideExit : ''}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className={styles.heroBg} />
      <div className={styles.heroGridOverlay} />
      <div className={styles.heroGlow} />
      <div className={styles.heroDiag} />

      <div className={styles.heroContent}>
        {/* Left column */}
        <div>
          <div className={styles.heroEyebrow}>
            <div className={styles.dot} />
            <span>{t('eyebrow')}</span>
          </div>

          <h1 className={styles.heroH1}>
            {t('title')}
            <br />
            <em>{t('titleEmphasis')}</em>
          </h1>

          <p className={styles.heroP}>{t('description')}</p>

        </div>

        {/* Right column — stats */}
        <div>
          <div className={styles.heroStats}>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={1995} />
              </div>
              <div className={styles.hstatL}>{t('statFounded')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={1500} suffix="+" />
              </div>
              <div className={styles.hstatL}>{t('statProducts')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={35} />
              </div>
              <div className={styles.hstatL}>{t('statVehicles')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={70} />
              </div>
              <div className={styles.hstatL}>{t('statStaff')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
