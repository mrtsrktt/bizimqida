'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import CountUp from '@/components/animations/CountUp';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 900px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const updateVisibility = useCallback(() => {
    const video = videoRef.current;
    const content = contentRef.current;
    if (!video || !content) return;

    const cur = video.currentTime;
    // Desktop video: 21.53s → show 3.0s-16.5s
    // Mobile video:  19.55s → show 3.0s-14.5s
    const duration = video.duration && !isNaN(video.duration) ? video.duration : 21.5;
    const hideTime = Math.max(0, duration - 5.0);
    const shouldShow = cur >= 3.0 && cur < hideTime;

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

  // Re-attach listeners when video source changes (mobile ↔ desktop)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Update video source based on screen size
    const newSrc = isMobile ? '/videos/hero-video-mobile.mp4' : '/videos/hero-video.mp4';
    if (video.getAttribute('src') !== newSrc) {
      video.src = newSrc;
      video.load();
      video.play().catch(() => {});
    }
  }, [isMobile]);

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
            src="/videos/hero-video.mp4"
            className={styles.heroVideo}
          />
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
        <div>
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
