'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './ServicesGrid.module.css';

const services = [
  { num: '01', titleKey: 'service1Title', descKey: 'service1Desc', icon: '📦' },
  { num: '02', titleKey: 'service2Title', descKey: 'service2Desc', icon: '❄️' },
  { num: '03', titleKey: 'service3Title', descKey: 'service3Desc', icon: '🌍' },
  { num: '04', titleKey: 'service4Title', descKey: 'service4Desc', icon: '🏭' },
  { num: '05', titleKey: 'service5Title', descKey: 'service5Desc', icon: '🚛' },
  { num: '06', titleKey: 'service6Title', descKey: 'service6Desc', icon: '🤝' },
] as const;

export default function ServicesGrid() {
  const t = useTranslations('services');

  return (
    <div className={styles.servicesSection}>
      {/* Background image with overlay */}
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 2, paddingTop: 80, paddingBottom: 80 }}>
        {/* Intro */}
        <RevealOnScroll>
          <div className="eyebrow" style={{ color: 'var(--gold)' }}>{t('eyebrow')}</div>
          <h2 className="section-h" style={{ color: '#fff' }}>
            {t('title')} <em style={{ color: 'var(--gold)' }}>{t('titleEmphasis')}</em>
          </h2>
        </RevealOnScroll>

        {/* Services grid */}
        <RevealOnScroll>
          <div className={styles.svcGrid}>
            {services.map((svc) => (
              <div key={svc.num} className={styles.svc}>
                <div className={styles.svcIcon}>{svc.icon}</div>
                <div className={styles.svcNum}>{svc.num}</div>
                <h3 className={styles.svcTitle}>{t(svc.titleKey)}</h3>
                <p className={styles.svcDesc}>{t(svc.descKey)}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
