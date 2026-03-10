'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './BoardMessage.module.css';

export default function BoardMessage() {
  const t = useTranslations('boardMessage');

  return (
    <div className={styles.boardMessageSection}>
      <div className="section-inner">
        <RevealOnScroll>
          <div className={styles.msgGrid}>
            {/* Left — Chairman photo placeholder */}
            <div className={styles.msgPhoto}>
              <div className={styles.msgPhotoInner}>
                <div className={styles.msgPhotoName}>
                  <h3>Mehmet Surkit</h3>
                  <p>{t('chairmanTitle')}</p>
                </div>
              </div>
            </div>

            {/* Right — Message content */}
            <div>
              <div className="eyebrow">{t('eyebrow')}</div>

              <blockquote className={styles.msgQuote}>
                &ldquo;{t('quote')}&rdquo;
              </blockquote>

              <p className={styles.msgBody}>{t('body1')}</p>
              <p className={styles.msgBody}>{t('body2')}</p>

              <Link href="/management" className="btn-primary">
                {t('ctaTeam')}
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
