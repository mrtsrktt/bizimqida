'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import NakhchivanMap from './NakhchivanMap';
import styles from './DistributionSection.module.css';

export default function DistributionSection() {
  const t = useTranslations('distribution');

  return (
    <div className={styles.wrapper}>
      <div className={styles.diagTop} />
      <div className={`section-inner ${styles.inner}`}>
        <RevealOnScroll>
          <div className={styles.topGrid}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--gold-light)' }}>
                {t('eyebrow')}
              </div>
              <h2 className="section-h light">
                {t('title')} <em>{t('titleEmphasis')}</em> {t('titleSuffix')}
              </h2>
              <p className="section-p light">
                {t('description')}
              </p>
            </div>
            <div className={styles.distPoints}>
              <div className={styles.dp}>
                <div className={styles.dpIcon}>&#x1F69B;</div>
                <div>
                  <h4>{t('fleetTitle')}</h4>
                  <p>{t('fleetDesc')}</p>
                </div>
              </div>
              <div className={styles.dp}>
                <div className={styles.dpIcon}>&#x1F3ED;</div>
                <div>
                  <h4>{t('warehouseTitle')}</h4>
                  <p>{t('warehouseDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Animated SVG Map */}
        <NakhchivanMap />

        <RevealOnScroll>
          <div className={styles.fleetImage}>
            <Image
              src="/images/fleet/delivery-vans-lineup.jpg"
              alt="Bizim Qida delivery fleet"
              width={1200}
              height={500}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
            />
          </div>
        </RevealOnScroll>
      </div>
      <div className={styles.diagBottom} />
    </div>
  );
}
