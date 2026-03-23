'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './BrandsGrid.module.css';

const brands = [
  { logo: '/images/markalar/ulker.png', name: 'Ülker' },
  { logo: '/images/markalar/azersun.png', name: 'Azersun' },
  { logo: '/images/markalar/ABC.png', name: 'ABC' },
  { logo: '/images/markalar/karmen.png', name: 'Karmen' },
  { logo: '/images/markalar/tadim.png', name: 'Tadım' },
];

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

        {/* Brand logos grid */}
        <RevealOnScroll>
          <div className={styles.brandList}>
            {brands.map((brand) => (
              <div key={brand.name} className={styles.brandCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={styles.brandLogo}
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
