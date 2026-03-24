'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="section">
      <div className="section-inner">
        <div className={styles.aboutGrid}>
          {/* Left — Image */}
          <RevealOnScroll>
            <div className={styles.aboutImgWrap}>
              <div className={styles.aboutImgBox}>
                <Image
                  src="/images/facility/exterior-fleet-sunset.jpg"
                  alt="Bizim Qida facility"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.aboutBadge}>
                <div className={styles.aboutBadgeN}>1995</div>
                <p className={styles.aboutBadgeP}>{t('founded')}</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — Text */}
          <RevealOnScroll>
            <div className={styles.aboutText}>
              <div className="eyebrow">{t('eyebrow')}</div>
              <h2 className="section-h">
                {t('title')} <em>{t('titleEmphasis')}</em>
              </h2>
              <p className="section-p">{t('description')}</p>
              <p className="section-p">{t('description2')}</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
