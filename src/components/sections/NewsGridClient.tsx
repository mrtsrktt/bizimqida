'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './NewsGrid.module.css';

export interface HoldingNewsItem {
  id?: string;
  badge: string;
  title: string;
  description: string;
  images: string[];
  imageLabel?: string;
  imageCaption?: string;
  portrait?: boolean;
  href?: string;
}

interface Props {
  apiNews: HoldingNewsItem[] | null;
}

export default function NewsGridClient({ apiNews }: Props) {
  const t = useTranslations('news');

  const defaultItems = [
    {
      id: 'news-1',
      tag: t('news1Tag'),
      title: t('news1Title'),
      description:
        'Sürkit Holding bünyesinde Nahçıvan merkezli kurulan modern gıda depolama ve soğuk zincir lojistik tesisi faaliyete geçti.',
      date: 'Mart 2025',
      image: '/images/facility/exterior-loading-docks.jpg',
      portrait: false,
      href: 'https://surkit.com.tr/basin-odasi',
    },
    {
      id: 'news-2',
      tag: t('news3Tag'),
      title: t('news3Title'),
      description:
        'Gıda güvenliği ve ürün tazeliğini korumak amacıyla filoya yeni soğutmalı araçlar eklendi.',
      date: 'Ocak 2025',
      image: '/images/warehouse/interior-tall-racks-b.jpg',
      portrait: false,
      href: 'https://surkit.com.tr/basin-odasi',
    },
  ];

  const items =
    apiNews && apiNews.length > 0
      ? apiNews.map((item, index) => {
          const rawHref = item.href || `https://surkit.com.tr/basin-odasi#haber-${index}`;
          const href =
            typeof window !== 'undefined' && window.location.hostname === 'localhost'
              ? rawHref.replace('https://surkit.com.tr', 'http://localhost:3001')
              : rawHref;

          return {
            id: item.id || `news-${index}`,
            tag: item.imageLabel || item.badge || 'Sürkit Holding',
            title: item.title,
            description: item.description,
            date: item.badge,
            image: item.images[0] || '/images/facility/exterior-loading-docks.jpg',
            portrait: item.portrait || false,
            href,
          };
        })
      : defaultItems;

  return (
    <section className={styles.newsSection}>
      <div className="section-inner">
        <RevealOnScroll>
          <div className={styles.newsHeader}>
            <div className={styles.newsHeaderLeft}>
              <div className={styles.newsHeaderBadge}>
                <span className={styles.livePulse} />
                <span>SÜRKİT HOLDİNG MEDYA & BASIN ODASI</span>
              </div>
              <h2 className="section-h">
                {t('title')} <em>{t('titleEmphasis')}</em>
              </h2>
              <p className={styles.newsSubDesc}>
                Sürkit Holding ve iştiraklerimize ait en son gelişmeler, basın açıklamaları ve kurumsal duyurular.
              </p>
            </div>
            <a
              href={
                typeof window !== 'undefined' && window.location.hostname === 'localhost'
                  ? 'http://localhost:3001/tr/basin-odasi'
                  : 'https://surkit.com.tr/basin-odasi'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={styles.allNewsBtn}
            >
              <span>Tüm Basın Odasını Gör</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className={styles.newsGrid}>
            {items.map((item, idx) => (
              <a
                key={item.id || idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nc}
              >
                <div className={styles.ncImgWrapper}>
                  {item.portrait ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized={item.image.startsWith('http')}
                        className={styles.ncImgBlurBg}
                      />
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized={item.image.startsWith('http')}
                        className={styles.ncImgContain}
                      />
                    </>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized={item.image.startsWith('http')}
                      className={styles.ncImg}
                    />
                  )}
                  <div className={styles.ntagBadge}>{item.tag}</div>
                </div>

                <div className={styles.ncBody}>
                  <h3 className={styles.ncTitle}>{item.title}</h3>
                  {item.description && (
                    <p className={styles.ncDesc}>{item.description}</p>
                  )}
                  <div className={styles.ncFooter}>
                    <span className={styles.ndate}>{item.date}</span>
                    <span className={styles.readMoreLink}>
                      <span>Devamını Oku</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
