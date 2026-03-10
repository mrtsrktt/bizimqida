'use client';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';

export default function HoldingStrip() {
  const t = useTranslations('holdingStrip');

  return (
    <div className={styles.holdingStrip}>
      <div className={styles.holdingStripInner}>
        <div className={styles.hsLine} />
        <p
          dangerouslySetInnerHTML={{
            __html: t('text', { holding: '<strong>Surkit Holding</strong>' }),
          }}
        />
        <div className={styles.hsLineR} />
      </div>
    </div>
  );
}
