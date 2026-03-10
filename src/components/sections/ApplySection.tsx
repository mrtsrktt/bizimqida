'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './ApplySection.module.css';

export default function ApplySection() {
  const t = useTranslations('apply');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      businessName: (form.elements.namedItem('businessName') as HTMLInputElement).value,
      businessType: (form.elements.namedItem('businessType') as HTMLSelectElement).value,
      contactName: (form.elements.namedItem('contactName') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      address: (form.elements.namedItem('address') as HTMLTextAreaElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section section-bg-gray">
      <div className="section-inner">
        <RevealOnScroll>
          <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 64px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>
              {t('eyebrow')}
            </div>
            <h2 className="section-h" style={{ textAlign: 'center' }}>
              {t('title')} <em>{t('titleEmphasis')}</em> {t('titleSuffix')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-soft)', lineHeight: 1.7, marginTop: '16px' }}>
              {t('description')}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className={styles.applyWrap}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>&#x2705;</div>
                <h3>{t('successTitle')}</h3>
                <p>{t('successMessage')}</p>
              </div>
            ) : (
              <form className={styles.applyForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.ff}>
                    <label>{t('formBusinessName')}</label>
                    <input type="text" name="businessName" required />
                  </div>
                  <div className={styles.ff}>
                    <label>{t('formBusinessType')}</label>
                    <select name="businessType" required>
                      <option value="Market">{t('typeMarket')}</option>
                      <option value="Restaurant">{t('typeRestaurant')}</option>
                      <option value="Hotel">{t('typeHotel')}</option>
                      <option value="Cafe">{t('typeCafe')}</option>
                      <option value="Other">{t('typeOther')}</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.ff}>
                    <label>{t('formContactName')}</label>
                    <input type="text" name="contactName" required />
                  </div>
                  <div className={styles.ff}>
                    <label>{t('formPhone')}</label>
                    <input type="tel" name="phone" required />
                  </div>
                </div>

                <div className={styles.ff}>
                  <label>{t('formEmail')}</label>
                  <input type="email" name="email" />
                </div>

                <div className={styles.ff}>
                  <label>{t('formAddress')}</label>
                  <textarea name="address" rows={2} />
                </div>

                <div className={styles.ff}>
                  <label>{t('formMessage')}</label>
                  <textarea name="message" rows={4} />
                </div>

                <button type="submit" className="btn-nav" disabled={loading}>
                  {loading ? '...' : t('formSubmit')}
                </button>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
