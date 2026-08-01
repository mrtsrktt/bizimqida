'use client';

import { useTranslations } from 'next-intl';
import CountUp from '@/components/animations/CountUp';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero}>
      {/* Background Video Wrapper with Soft Opening Entrance Animation */}
      <div className={styles.videoWrapper}>
        <div className={styles.videoContainer}>
          <video
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

      <div className={styles.heroContent}>
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
                <CountUp target={1995} delay={5500} />
              </div>
              <div className={styles.hstatL}>{t('statFounded')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={1500} suffix="+" delay={5800} />
              </div>
              <div className={styles.hstatL}>{t('statProducts')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={35} delay={6100} />
              </div>
              <div className={styles.hstatL}>{t('statVehicles')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
