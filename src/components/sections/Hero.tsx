'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import CountUp from '@/components/animations/CountUp';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('hero');
  const [showText, setShowText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration && !isNaN(video.duration) ? video.duration : 21.5;
      const hideTime = Math.max(0, duration - 5.0); // Exactly 5 seconds before video ends

      // Show text starting at 3.0s, hide text at hideTime (5s before video ends)
      const shouldShow = currentTime >= 3.0 && currentTime < hideTime;

      setShowText((prev) => {
        if (prev !== shouldShow) return shouldShow;
        return prev;
      });
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    // Initial check
    onTimeUpdate();

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background Video Wrapper */}
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

      <div
        className={`${styles.heroContent} ${showText ? styles.heroContentVisible : ''}`}
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? 'translateY(0)' : 'translateY(22px)',
          pointerEvents: showText ? 'auto' : 'none',
          transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
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
                {showText && <CountUp target={1995} delay={200} />}
              </div>
              <div className={styles.hstatL}>{t('statFounded')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                {showText && <CountUp target={1500} suffix="+" delay={400} />}
              </div>
              <div className={styles.hstatL}>{t('statProducts')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                {showText && <CountUp target={35} delay={600} />}
              </div>
              <div className={styles.hstatL}>{t('statVehicles')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
