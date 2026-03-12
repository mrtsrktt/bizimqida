'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './ServicesGrid.module.css';

const services = [
  { num: 1, titleKey: 'service1Title', descKey: 'service1Desc' },
  { num: 2, titleKey: 'service2Title', descKey: 'service2Desc' },
  { num: 3, titleKey: 'service3Title', descKey: 'service3Desc' },
  { num: 4, titleKey: 'service4Title', descKey: 'service4Desc' },
  { num: 5, titleKey: 'service5Title', descKey: 'service5Desc' },
  { num: 6, titleKey: 'service6Title', descKey: 'service6Desc' },
] as const;

function ServiceNum({ target }: { target: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const timer = setInterval(() => {
      cur += 1;
      setCount(cur);
      if (cur >= target) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className={styles.svcNum}>
      {String(count).padStart(2, '0')}
    </div>
  );
}

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
                <ServiceNum target={svc.num} />
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
