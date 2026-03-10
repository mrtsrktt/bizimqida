'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CountUp from '@/components/animations/CountUp';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero}>
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

          <div className={styles.heroActions}>
            <Link href="/about" className="btn-primary">
              {t('ctaPrimary')}
            </Link>
            <Link href="/contact" className="btn-ghost">
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Right column — stats */}
        <div>
          <div className={styles.heroStats}>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={25} suffix="+" />
              </div>
              <div className={styles.hstatL}>{t('statYears')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={500} suffix="+" />
              </div>
              <div className={styles.hstatL}>{t('statClients')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={1200} suffix="+" />
              </div>
              <div className={styles.hstatL}>{t('statProducts')}</div>
            </div>
            <div className={styles.hstat}>
              <div className={styles.hstatN}>
                <CountUp target={7} />
              </div>
              <div className={styles.hstatL}>{t('statZones')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
