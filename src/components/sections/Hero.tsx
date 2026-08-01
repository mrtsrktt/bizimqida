'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import CountUp from '@/components/animations/CountUp';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const countUpContainerRef = useRef<HTMLDivElement>(null);

  const updateVisibility = useCallback(() => {
    const video = videoRef.current;
    const content = contentRef.current;
    if (!video || !content) return;

    const cur = video.currentTime;
    // Video is 21.53s total
    // Show text: 3.0s <= currentTime < 16.5s
    // Hide text: currentTime < 3.0s OR currentTime >= 16.5s
    const shouldShow = cur >= 3.0 && cur < 16.5;

    if (shouldShow !== isVisibleRef.current) {
      isVisibleRef.current = shouldShow;

      if (shouldShow) {
        content.style.opacity = '1';
        content.style.visibility = 'visible';
        content.style.transform = 'translateY(0)';
        content.style.pointerEvents = 'auto';
      } else {
        content.style.opacity = '0';
        content.style.visibility = 'hidden';
        content.style.transform = 'translateY(22px)';
        content.style.pointerEvents = 'none';
      }
    }
  }, []);

  useEffect(() => {
    // Force page to start at top on every load/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const video = videoRef.current;
    const content = contentRef.current;
    if (!video || !content) return;

    // Set initial hidden state immediately via DOM
    content.style.opacity = '0';
    content.style.visibility = 'hidden';
    content.style.transform = 'translateY(22px)';
    content.style.pointerEvents = 'none';
    content.style.transition = 'opacity 0.7s ease, visibility 0.7s ease, transform 0.7s ease';

    // Listen for timeupdate
    video.addEventListener('timeupdate', updateVisibility);

    // Also poll every 200ms as a safety net
    const interval = setInterval(updateVisibility, 200);

    return () => {
      video.removeEventListener('timeupdate', updateVisibility);
      clearInterval(interval);
    };
  }, [updateVisibility]);

  return (
    <section className={styles.hero}>
      {/* Background Video */}
      <div className={styles.videoWrapper}>
        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/facility/exterior-front-wide.jpg"
            className={styles.heroVideo}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
        </div>
      </div>

      <div className={styles.heroGridOverlay} />
      <div className={styles.heroGlow} />
      <div className={styles.heroDiag} />

      <div ref={contentRef} className={styles.heroContent}>
        {/* Left column */}
        <div>
          <div className={styles.heroEyebrow}>
            <div className={styles.dot} />
            <span>{t('eyebrow')}</span>
          </div>

          <h1 className={styles.heroH1}>
            {t('title')} {t('titleEmphasis')}
          </h1>

          <p className={styles.heroP}>{t('description')}</p>
        </div>

        {/* Right column — stats */}
        <div ref={countUpContainerRef}>
          <div className={styles.heroStats}>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={1995} delay={3200} />
              </div>
              <div className={styles.hstatL}>{t('statFounded')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={1500} suffix="+" delay={3400} />
              </div>
              <div className={styles.hstatL}>{t('statProducts')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={35} delay={3600} />
              </div>
              <div className={styles.hstatL}>{t('statVehicles')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
