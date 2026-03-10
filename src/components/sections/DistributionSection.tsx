'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './DistributionSection.module.css';

const regions = [
  { name: 'Naxcivan Merkez', pct: 95 },
  { name: 'Ordubad', pct: 80 },
  { name: 'Serur', pct: 75 },
  { name: 'Culfa', pct: 70 },
  { name: 'Kengerli', pct: 65 },
  { name: 'Babek', pct: 60 },
  { name: 'Sederek', pct: 55 },
];

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

        <RevealOnScroll>
          <div className={styles.distMapCard}>
            <h3>{t('mapTitle')}</h3>
            <div className={styles.regionsGrid}>
              {regions.map((r) => (
                <div key={r.name} className={styles.regionRow}>
                  <span className={styles.rrName}>{r.name}</span>
                  <div className={styles.rrBar}>
                    <div
                      className={styles.rrFill}
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <span className={styles.rrPct}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

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
