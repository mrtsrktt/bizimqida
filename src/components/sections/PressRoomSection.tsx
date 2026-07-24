'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './PressRoomSection.module.css';
import { HoldingNewsItem } from './NewsGridClient';

interface Props {
  apiNews: HoldingNewsItem[] | null;
}

export default function PressRoomSection({ apiNews }: Props) {
  const t = useTranslations('pressRoomPage');

  const defaultItems: HoldingNewsItem[] = [
    {
      id: 'news-1',
      badge: 'Mart 2025',
      title: 'Sürkit Holding bünyesinde yeni dağıtım merkezi Nahçıvan\'da hizmete açıldı',
      description:
        'Nahçıvan genelindeki gıda tedarik zincirini daha da güçlendirmek ve 450\'yi aşkın aktif müşterimize daha hızlı hizmet sunmak amacıyla inşa edilen yeni lojistik merkezimiz faaliyete başladı.',
      images: ['/images/facility/exterior-loading-docks.jpg'],
      imageLabel: 'Nahçıvan · Lojistik Merkez',
      portrait: false,
      href: 'https://surkit.com.tr/basin-odasi',
    },
    {
      id: 'news-2',
      badge: 'Ocak 2025',
      title: 'Soğuk zincir altyapısında büyük yatırım',
      description:
        'Ürün tazeliği ve gıda güvenliği standartlarını en üst seviyede tutmak adına 35 araçlık filomuza yeni nesil soğutmalı araçlar eklendi.',
      images: ['/images/warehouse/interior-tall-racks-b.jpg'],
      imageLabel: 'Filo & Lojistik',
      portrait: false,
      href: 'https://surkit.com.tr/basin-odasi',
    },
  ];

  const newsList =
    apiNews && apiNews.length > 0
      ? apiNews.map((item, index) => {
          const rawHref = item.href || `https://surkit.com.tr/basin-odasi#haber-${index}`;
          const href =
            typeof window !== 'undefined' && window.location.hostname === 'localhost'
              ? rawHref.replace('https://surkit.com.tr', 'http://localhost:3001')
              : rawHref;

          return {
            ...item,
            id: item.id || `news-${index}`,
            href,
          };
        })
      : defaultItems;

  const featuredItem = newsList[0];
  const gridItems = newsList.slice(1);

  return (
    <div className={styles.pressRoomPage}>
      {/* PAGE HERO BANNER WITH DESKTOP & MOBILE RESPONSIVE IMAGES */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="/images/basin-odasi-gorsel-masaustu.jpg"
            alt="Bizim Qida Basın Odası"
            fill
            priority
            className={styles.heroBgDesktop}
          />
          <Image
            src="/images/basin-odasi-gorsel-mobil.jpg"
            alt="Bizim Qida Basın Odası Mobil"
            fill
            priority
            className={styles.heroBgMobile}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className="section-inner" style={{ position: 'relative', zIndex: 10 }}>
          <RevealOnScroll>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                {t('heroTitle')} <em>{t('heroTitleEmphasis')}</em>
              </h1>
              <p className={styles.heroDesc}>{t('heroDesc')}</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className={styles.contentSection}>
        <div className="section-inner">
          {/* FEATURED SPOTLIGHT ARTICLE */}
          {featuredItem && (
            <RevealOnScroll>
              <div className={styles.featuredWrapper}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionBadge}>{t('featuredBadge')}</div>
                  <h2 className={styles.sectionTitle}>{t('featuredTitle')}</h2>
                </div>

                <a
                  href={featuredItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.featuredCard}
                >
                  <div className={styles.featuredImgWrap}>
                    {featuredItem.portrait ? (
                      <>
                        <Image
                          src={featuredItem.images[0]}
                          alt={featuredItem.title}
                          fill
                          unoptimized={featuredItem.images[0]?.startsWith('http')}
                          className={styles.ncImgBlurBg}
                        />
                        <Image
                          src={featuredItem.images[0]}
                          alt={featuredItem.title}
                          fill
                          unoptimized={featuredItem.images[0]?.startsWith('http')}
                          className={styles.ncImgContain}
                        />
                      </>
                    ) : (
                      <Image
                        src={featuredItem.images[0]}
                        alt={featuredItem.title}
                        fill
                        unoptimized={featuredItem.images[0]?.startsWith('http')}
                        className={styles.featuredImg}
                      />
                    )}
                    <span className={styles.tagBadge}>
                      {featuredItem.imageLabel || featuredItem.badge}
                    </span>
                  </div>

                  <div className={styles.featuredBody}>
                    <span className={styles.newsDate}>{featuredItem.badge}</span>
                    <h3 className={styles.featuredTitle}>{featuredItem.title}</h3>
                    <p className={styles.featuredDesc}>{featuredItem.description}</p>
                    <div className={styles.readMoreAction}>
                      <span>{t('readMore')}</span>
                      <svg
                        width="16"
                        height="16"
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
                    </div>
                  </div>
                </a>
              </div>
            </RevealOnScroll>
          )}

          {/* ALL PRESS RELEASES GRID */}
          <RevealOnScroll>
            <div className={styles.gridSectionHeader}>
              <div className={styles.sectionBadge}>{t('allReleasesBadge')}</div>
              <h2 className={styles.sectionTitle}>{t('allReleasesTitle')}</h2>
            </div>

            <div className={styles.pressGrid}>
              {gridItems.map((item, idx) => (
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
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          unoptimized={item.images[0]?.startsWith('http')}
                          className={styles.ncImgBlurBg}
                        />
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          unoptimized={item.images[0]?.startsWith('http')}
                          className={styles.ncImgContain}
                        />
                      </>
                    ) : (
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        unoptimized={item.images[0]?.startsWith('http')}
                        className={styles.ncImg}
                      />
                    )}
                    <div className={styles.ntagBadge}>
                      {item.imageLabel || item.badge}
                    </div>
                  </div>

                  <div className={styles.ncBody}>
                    <h3 className={styles.ncTitle}>{item.title}</h3>
                    {item.description && (
                      <p className={styles.ncDesc}>{item.description}</p>
                    )}
                    <div className={styles.ncFooter}>
                      <span className={styles.ndate}>{item.badge}</span>
                      <span className={styles.readMoreLink}>
                        <span>{t('readMoreShort')}</span>
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

          {/* MEDIA CONTACT & PRESS KIT CARD */}
          <RevealOnScroll>
            <div className={styles.pressKitBox}>
              <div className={styles.pressKitInfo}>
                <span className={styles.pkEyebrow}>{t('mediaContactEyebrow')}</span>
                <h3 className={styles.pkTitle}>{t('mediaContactTitle')}</h3>
                <p className={styles.pkDesc}>{t('mediaContactDesc')}</p>
                <div className={styles.pkContacts}>
                  <a href="mailto:info@surkit.com.tr" className={styles.pkContactLink}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>info@surkit.com.tr</span>
                  </a>
                  <a href="tel:+902166064071" className={styles.pkContactLink}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>+90 216 606 4071</span>
                  </a>
                </div>
              </div>

              <div className={styles.pressKitAction}>
                <a
                  href={
                    typeof window !== 'undefined' && window.location.hostname === 'localhost'
                      ? 'http://localhost:3001/tr/basin-odasi'
                      : 'https://surkit.com.tr/basin-odasi'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadBtn}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{t('viewPressRoomBtn')}</span>
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
