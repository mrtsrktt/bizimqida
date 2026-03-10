'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import styles from './OrgChart.module.css';

export default function OrgChart() {
  const t = useTranslations('management');

  return (
    <section className="section">
      <div className="section-inner">
        {/* Intro */}
        <RevealOnScroll className={styles.mgmtIntro}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            {t('eyebrow')}
          </div>
          <h2 className="section-h" style={{ textAlign: 'center' }}>
            {t('title')} <em>{t('titleEmphasis')}</em>
          </h2>
          <p className="section-p" style={{ textAlign: 'center', margin: '0 auto' }}>
            {t('description')}
          </p>
        </RevealOnScroll>

        {/* Org Chart */}
        <RevealOnScroll>
          <div className={styles.orgWrap}>
            <div className={styles.orgChart}>

              {/* Tier 1: Holding */}
              <div className={styles.tier} style={{ marginBottom: 0 }}>
                <div className={`${styles.pcard} ${styles.ceo} ${styles.holding}`}>
                  <div className={styles.pcardAvatar}>SH</div>
                  <div className={styles.pcardName}>S&uuml;rkit Holding</div>
                  <div className={styles.pcardTitle}>Ana Ortakl&#305;k / Parent Company</div>
                  <div className={styles.pcardDesc}>I&#287;d&#305;r &middot; Baku &middot; Tbilisi &middot; Nax&#231;&#305;van</div>
                </div>
              </div>

              {/* Connector: single vertical */}
              <div className={styles.connectorSingle}>
                <div className={styles.connectorSingleLine} />
              </div>

              {/* Tier 2: General Manager */}
              <div className={styles.tier} style={{ marginBottom: 0 }}>
                <div className={`${styles.pcard} ${styles.ceo}`}>
                  <div className={styles.pcardAvatar}>GM</div>
                  <div className={styles.pcardName}>{t('generalManager')}</div>
                  <div className={styles.pcardTitle}>Bizim Qida</div>
                  <div className={styles.pcardDesc}>{t('gmDescription')}</div>
                </div>
              </div>

              {/* Connector: GM down to 4 directors */}
              <div className={styles.connectorMulti}>
                <div className={styles.connectorCenterUp} />
                <div className={styles.connectorHBar} />
                <div className={styles.connectorDrop} style={{ left: '12.5%' }} />
                <div className={styles.connectorDrop} style={{ left: '37.5%' }} />
                <div className={styles.connectorDrop} style={{ left: '62.5%' }} />
                <div className={styles.connectorDrop} style={{ left: '87.5%' }} />
              </div>

              {/* Tier 3: 4 Directors */}
              <div className={styles.tier} style={{ gap: 16, marginBottom: 0 }}>
                <div className={styles.pcard}>
                  <div className={`${styles.pcardAvatar} ${styles.directorAvatar}`}>SF</div>
                  <div className={styles.pcardName}>{t('salesDirector')}</div>
                  <div className={styles.pcardTitle}>Sales &amp; Distribution</div>
                  <div className={styles.pcardDesc}>{t('salesDirectorDesc')}</div>
                </div>
                <div className={styles.pcard}>
                  <div className={`${styles.pcardAvatar} ${styles.directorAvatar}`}>LO</div>
                  <div className={styles.pcardName}>{t('logisticsDirector')}</div>
                  <div className={styles.pcardTitle}>Operations &amp; Logistics</div>
                  <div className={styles.pcardDesc}>{t('logisticsDirectorDesc')}</div>
                </div>
                <div className={styles.pcard}>
                  <div className={`${styles.pcardAvatar} ${styles.directorAvatar}`}>MF</div>
                  <div className={styles.pcardName}>{t('financeDirector')}</div>
                  <div className={styles.pcardTitle}>Finance &amp; Accounting</div>
                  <div className={styles.pcardDesc}>{t('financeDirectorDesc')}</div>
                </div>
                <div className={styles.pcard}>
                  <div className={`${styles.pcardAvatar} ${styles.directorAvatar}`}>IK</div>
                  <div className={styles.pcardName}>{t('hrDirector')}</div>
                  <div className={styles.pcardTitle}>Human Resources</div>
                  <div className={styles.pcardDesc}>{t('hrDirectorDesc')}</div>
                </div>
              </div>

              {/* Connector: Directors down to Department Heads */}
              <div className={styles.connectorMultiLower}>
                <div className={styles.connectorHBarLower} />
                <div className={styles.connectorDropLower} style={{ left: '12.5%' }} />
                <div className={styles.connectorDropLower} style={{ left: '37.5%' }} />
                <div className={styles.connectorDropLower} style={{ left: '62.5%' }} />
                <div className={styles.connectorDropLower} style={{ left: '87.5%' }} />
              </div>

              {/* Tier 4: Department Heads */}
              <div className={styles.tier} style={{ gap: 16 }}>
                <div className={`${styles.pcard} ${styles.deptCard}`}>
                  <div className={`${styles.pcardAvatar} ${styles.deptAvatar}`}>S1</div>
                  <div className={`${styles.pcardName} ${styles.deptName}`}>{t('regionalSalesManager')}</div>
                  <div className={`${styles.pcardTitle} ${styles.deptTitle}`}>x3 Regions</div>
                </div>
                <div className={`${styles.pcard} ${styles.deptCard}`}>
                  <div className={`${styles.pcardAvatar} ${styles.deptAvatar}`}>D1</div>
                  <div className={`${styles.pcardName} ${styles.deptName}`}>{t('warehouseManager')}</div>
                  <div className={`${styles.pcardTitle} ${styles.deptTitle}`}>Cold Chain</div>
                </div>
                <div className={`${styles.pcard} ${styles.deptCard}`}>
                  <div className={`${styles.pcardAvatar} ${styles.deptAvatar}`}>MH</div>
                  <div className={`${styles.pcardName} ${styles.deptName}`}>{t('chiefAccountant')}</div>
                  <div className={`${styles.pcardTitle} ${styles.deptTitle}`}>Accounting</div>
                </div>
                <div className={`${styles.pcard} ${styles.deptCard}`}>
                  <div className={`${styles.pcardAvatar} ${styles.deptAvatar}`}>IK</div>
                  <div className={`${styles.pcardName} ${styles.deptName}`}>{t('hrSpecialist')}</div>
                  <div className={`${styles.pcardTitle} ${styles.deptTitle}`}>Training &amp; Dev</div>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
