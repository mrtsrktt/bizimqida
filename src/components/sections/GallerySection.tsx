'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './GallerySection.module.css';

const images = [
  { src: '/images/warehouse/interior-wide-angle.jpg', alt: 'Depo genel görünüm' },
  { src: '/images/fleet/branded-trucks-lineup.jpg', alt: 'Araç filosu' },
  { src: '/images/warehouse/interior-tall-racks-a.jpg', alt: 'Depo rafları' },
  { src: '/images/fleet/delivery-vans-lineup.jpg', alt: 'Dağıtım araçları' },
  { src: '/images/warehouse/interior-forklift-aisle.jpg', alt: 'Forklift operasyonu' },
  { src: '/images/warehouse/interior-flour-stacks.jpg', alt: 'Ürün depolama' },
  { src: '/images/fleet/branded-transit-vans.jpg', alt: 'Transit araçlar' },
  { src: '/images/warehouse/interior-workers.jpg', alt: 'Depo çalışanları' },
  { src: '/images/warehouse/interior-tall-racks-b.jpg', alt: 'Depo kapasitesi' },
];

export default function GallerySection() {
  const t = useTranslations('gallery');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const navigate = useCallback((dir: number) => {
    setLightbox((prev) => {
      if (prev === null) return null;
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.diagTop} />
      <div className={`section-inner ${styles.inner}`}>
        <RevealOnScroll>
          <div className={styles.header}>
            <div className="eyebrow" style={{ color: 'var(--gold-light)', justifyContent: 'center' }}>
              {t('eyebrow')}
            </div>
            <h2 className="section-h light" style={{ textAlign: 'center' }}>
              {t('title')} <em>{t('titleEmphasis')}</em>
            </h2>
            <p className="section-p light" style={{ textAlign: 'center', margin: '0 auto' }}>
              {t('description')}
            </p>
            <span className={styles.goldLine} />
          </div>
        </RevealOnScroll>

        <div className={styles.grid}>
          {images.map((img, i) => (
            <div
              key={img.src}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`${styles.item} ${styles.itemReveal}`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.diagBottom} />

      {/* Lightbox */}
      <div
        className={`${styles.lightbox} ${lightbox !== null ? styles.lightboxOpen : ''}`}
        onClick={() => setLightbox(null)}
      >
        {lightbox !== null && (
          <>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Kapat">
              &times;
            </button>
            <button
              className={`${styles.lightboxNav} ${styles.navPrev}`}
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Önceki"
            >
              &#8249;
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.lightboxImg}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className={`${styles.lightboxNav} ${styles.navNext}`}
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Sonraki"
            >
              &#8250;
            </button>
          </>
        )}
      </div>
    </div>
  );
}
