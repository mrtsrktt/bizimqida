'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './NewsGrid.module.css';

const newsItems = [
  {
    tagKey: 'news1Tag',
    titleKey: 'news1Title',
    date: 'Mart 2025',
    image: '/images/facility/exterior-loading-docks.jpg',
    featured: true,
  },
  {
    tagKey: 'news3Tag',
    titleKey: 'news3Title',
    date: 'Ocak 2025',
    image: '/images/warehouse/interior-tall-racks-b.jpg',
    featured: false,
  },
];

export default function NewsGrid() {
  const t = useTranslations('news');

  return (
    <section className="section section-bg-gray" style={{ paddingTop: '20px' }}>
      <div className="section-inner">
        <RevealOnScroll>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 0 }}>
            <div>
              <div className="eyebrow">{t('eyebrow')}</div>
              <h2 className="section-h">
                {t('title')} <em>{t('titleEmphasis')}</em>
              </h2>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className={styles.newsGrid}>
            {newsItems.map((item) => (
              <div
                key={item.titleKey}
                className={`${styles.nc} ${item.featured ? styles.featured : ''}`}
              >
                <div className={styles.ncImg}>
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.ntag}>{t(item.tagKey)}</div>
                <h3 className={styles.ncTitle}>{t(item.titleKey)}</h3>
                <div className={styles.ndate}>{item.date}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
