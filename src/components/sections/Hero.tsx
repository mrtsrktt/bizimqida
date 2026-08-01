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

    const checkTime = () => {
      const cur = video.currentTime;
      // Total video length is 21.53 seconds.
      // Show text at 3.0 seconds.
      // Hide text at 16.5 seconds (exactly 5 seconds before 21.5s end, for logo sequence).
      const shouldShow = cur >= 3.0 && cur < 16.5;

      setShowText(shouldShow);
    };

    video.addEventListener('timeupdate', checkTime);
    const interval = setInterval(checkTime, 150); // Fallback ticker every 150ms

    checkTime();

    return () => {
      video.removeEventListener('timeupdate', checkTime);
      clearInterval(interval);
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
          visibility: showText ? 'visible' : 'hidden',
          transform: showText ? 'translateY(0)' : 'translateY(22px)',
          pointerEvents: showText ? 'auto' : 'none',
          transition: 'opacity 0.7s ease, transform 0.7s ease, visibility 0.7s ease',
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
