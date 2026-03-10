'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './ServicesGrid.module.css';

const services = [
  { num: '01', titleKey: 'service1Title', descKey: 'service1Desc' },
  { num: '02', titleKey: 'service2Title', descKey: 'service2Desc' },
  { num: '03', titleKey: 'service3Title', descKey: 'service3Desc' },
  { num: '04', titleKey: 'service4Title', descKey: 'service4Desc' },
  { num: '05', titleKey: 'service5Title', descKey: 'service5Desc' },
  { num: '06', titleKey: 'service6Title', descKey: 'service6Desc' },
] as const;

export default function ServicesGrid() {
  const t = useTranslations('services');

  return (
    <div style={{ background: 'var(--off-white)', overflow: 'hidden', position: 'relative' }}>
      {/* Diagonal top transition */}
      <div className={styles.diagTop} />

      <div className="section-inner" style={{ paddingTop: 20, paddingBottom: 80 }}>
        {/* Intro */}
        <RevealOnScroll>
          <div className="eyebrow">{t('eyebrow')}</div>
          <h2 className="section-h">
            {t('title')} <em>{t('titleEmphasis')}</em>
          </h2>
        </RevealOnScroll>

        {/* Services grid */}
        <RevealOnScroll>
          <div className={styles.svcGrid}>
            {services.map((svc) => (
              <div key={svc.num} className={styles.svc}>
                <div className={styles.svcNum}>{svc.num}</div>
                <h3 className={styles.svcTitle}>{t(svc.titleKey)}</h3>
                <p className={styles.svcDesc}>{t(svc.descKey)}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Diagonal bottom transition */}
      <div className={styles.diagBottom} />
    </div>
  );
}
