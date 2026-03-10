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
                  src="/images/facility/exterior-front-clean.jpg"
                  alt="Bizim Qida facility"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.aboutBadge}>
                <div className={styles.aboutBadgeN}>1997</div>
                <p className={styles.aboutBadgeP}>{t('founded')}</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — Text */}
          <RevealOnScroll>
            <div className={styles.aboutText}>
              <div className="eyebrow">{t('eyebrow')}</div>
              <h2 className="section-h">
                {t('title')} <em>{t('titleEmphasis')}</em> {t('titleSuffix')}
              </h2>
              <p className="section-p">{t('description')}</p>

              <div className={styles.valueCards}>
                <div className={styles.vc}>
                  <div className={styles.vcIcon}>&#127942;</div>
                  <div>
                    <h4>{t('value1Title')}</h4>
                    <p>{t('value1Desc')}</p>
                  </div>
                </div>
                <div className={styles.vc}>
                  <div className={styles.vcIcon}>&#128161;</div>
                  <div>
                    <h4>{t('value2Title')}</h4>
                    <p>{t('value2Desc')}</p>
                  </div>
                </div>
                <div className={styles.vc}>
                  <div className={styles.vcIcon}>&#129309;</div>
                  <div>
                    <h4>{t('value3Title')}</h4>
                    <p>{t('value3Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
