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
                  <div className={styles.ciVal}>+994 36 XXX XX XX</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>&#x2709;&#xFE0F;</div>
                <div>
                  <div className={styles.ciLabel}>E-mail</div>
                  <div className={styles.ciVal}>info@bizimqida.az</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>&#x1F550;</div>
                <div>
                  <div className={styles.ciLabel}>{t('workingHoursLabel')}</div>
                  <div className={styles.ciVal}>{t('workingHoursValue')}</div>
                </div>
              </div>

              <div className={styles.holdingRef}>
                <div style={{ fontSize: '28px' }}>&#x1F3E2;</div>
                <div>
                  <p>
                    <strong>Surkit Holding</strong> {t('holdingRef')}
                  </p>
                  <a
                    href="https://www.surkit.com.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.holdingRefLink}
                  >
                    surkit.com.tr &rarr;
                  </a>
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
                  <option>{t('subjectCareer')}</option>
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
