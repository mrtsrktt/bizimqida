'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './CareerSection.module.css';

const jobs = [
  { titleKey: 'job1Title' },
  { titleKey: 'job2Title' },
  { titleKey: 'job3Title' },
  { titleKey: 'job4Title' },
];

export default function CareerSection() {
  const t = useTranslations('career');

  return (
    <section className="section">
      <div className="section-inner">
        <RevealOnScroll>
          <div className={styles.careerWrap}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--gold-light)' }}>
                {t('eyebrow')}
              </div>
              <h2 className="section-h light">
                {t('title')} <em>{t('titleEmphasis')}</em>
              </h2>
              <p className="section-p light" style={{ marginBottom: '32px' }}>
                {t('description')}
              </p>
              <Link href="/contact" className="btn-primary">
                {t('ctaApply')}
              </Link>
            </div>
            <div className={styles.jobs}>
              {jobs.map((job) => (
                <div key={job.titleKey} className={styles.job}>
                  <div>
                    <h4 className={styles.jobTitle}>{t(job.titleKey)}</h4>
                    <div className={styles.jobTags}>
                      <span className={styles.jtag}>{t('fullTime')}</span>
                      <span className={styles.jtag}>Naxcivan</span>
                    </div>
                  </div>
                  <span className={styles.jobArrow}>&rarr;</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
