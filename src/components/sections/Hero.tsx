'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import CountUp from '@/components/animations/CountUp';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('hero');
  const [showText, setShowText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;

    // Video duration: ~21.5s
    // Show text 3 seconds after video start (currentTime >= 3.0)
    // Hide text 5 seconds before video ends (currentTime < 16.5)
    if (currentTime >= 3.0 && currentTime < 16.5) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background Video Wrapper with Soft Opening Entrance Animation */}
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
            onTimeUpdate={handleTimeUpdate}
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

      <div className={`${styles.heroContent} ${showText ? styles.heroContentVisible : ''}`}>
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
                {showText && <CountUp target={1995} delay={300} />}
              </div>
              <div className={styles.hstatL}>{t('statFounded')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                {showText && <CountUp target={1500} suffix="+" delay={500} />}
              </div>
              <div className={styles.hstatL}>{t('statProducts')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                {showText && <CountUp target={35} delay={700} />}
              </div>
              <div className={styles.hstatL}>{t('statVehicles')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
