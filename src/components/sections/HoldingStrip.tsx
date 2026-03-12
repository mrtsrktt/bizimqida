'use client';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';

export default function HoldingStrip() {
  const t = useTranslations('holdingStrip');

  const logoHtml = '<img src="/images/surkit-logo.png" alt="Sürkit Holding" style="height:18px;width:auto;vertical-align:middle;filter:brightness(0) invert(1);opacity:0.9;margin:0 4px" />';

  return (
    <div className={styles.holdingStrip}>
      <div className={styles.holdingStripInner}>
        <div className={styles.hsLine} />
        <p
          dangerouslySetInnerHTML={{
            __html: t('text', { holding: logoHtml }),
          }}
        />
        <div className={styles.hsLineR} />
      </div>
    </div>
  );
}
