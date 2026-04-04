'use client';
import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const t = useTranslations('contact');

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
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className={styles.contactGrid}>
            {/* Left — contact info */}
            <div>
              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>&#x1F4CD;</div>
                <div>
                  <div className={styles.ciLabel}>{t('addressLabel')}</div>
                  <div className={styles.ciVal}>
                    Naxcivan Muxtar Respublikasi, Naxcivan seheri, Azerbaycan
                  </div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>&#x1F4DE;</div>
                <div>
                  <div className={styles.ciLabel}>{t('phoneLabel')}</div>
                  <div className={styles.ciVal}>+994 36 551 30 38</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>&#x2709;&#xFE0F;</div>
                <div>
                  <div className={styles.ciLabel}>E-mail</div>
                  <div className={styles.ciVal}>info@surkit.com.tr</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>&#x1F550;</div>
                <div>
                  <div className={styles.ciLabel}>{t('workingHoursLabel')}</div>
                  <div className={styles.ciVal}>{t('workingHoursValue')}</div>
                </div>
              </div>

            </div>

            {/* Right — form */}
            <form
              className={styles.cform}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={styles.formRow}>
                <div className={styles.ff}>
                  <label>{t('formName')}</label>
                  <input type="text" />
                </div>
                <div className={styles.ff}>
                  <label>{t('formPhone')}</label>
                  <input type="tel" />
                </div>
              </div>

              <div className={styles.ff}>
                <label>E-mail</label>
                <input type="email" />
              </div>

              <div className={styles.ff}>
                <label>{t('formSubject')}</label>
                <select>
                  <option>{t('subjectSupply')}</option>
                  <option>{t('subjectPartnership')}</option>
                  <option>{t('subjectGeneral')}</option>
                </select>
              </div>

              <div className={styles.ff}>
                <label>{t('formMessage')}</label>
                <textarea rows={5} />
              </div>

              <button type="submit" className="btn-nav">
                {t('formSubmit')}
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
