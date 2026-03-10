'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './BrandsGrid.module.css';

const brands = [
  { emoji: '\u{1F33E}', titleKey: 'flourTitle', descKey: 'flourDesc', bg: '#FFF3E0' },
  { emoji: '\u{1F95B}', titleKey: 'dairyTitle', descKey: 'dairyDesc', bg: '#E3F2FD' },
  { emoji: '\u{1F36A}', titleKey: 'biscuitsTitle', descKey: 'biscuitsDesc', bg: '#FFF8E1' },
  { emoji: '\u{1F96B}', titleKey: 'cannedTitle', descKey: 'cannedDesc', bg: '#E8F5E9' },
] as const;

export default function BrandsGrid() {
  const t = useTranslations('brands');

  return (
    <section className="section">
      <div className="section-inner">
        {/* Header */}
        <RevealOnScroll className={styles.brandsHeader}>
          <div>
            <div className="eyebrow">{t('eyebrow')}</div>
            <h2 className="section-h">
              {t('title')} <em>{t('titleEmphasis')}</em>
            </h2>
          </div>
          <p className={`section-p ${styles.brandsHeaderDesc}`}>
            {t('description')}
          </p>
        </RevealOnScroll>

        {/* Brand cards grid */}
        <RevealOnScroll>
          <div className={styles.brandList}>
            {brands.map((brand) => (
              <div key={brand.titleKey} className={styles.brandCard}>
                <div className={styles.brandIcon} style={{ background: brand.bg }}>
                  {brand.emoji}
                </div>
                <h4 className={styles.brandTitle}>{t(brand.titleKey)}</h4>
                <p className={styles.brandDesc}>{t(brand.descKey)}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
