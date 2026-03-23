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

              {/* Board Section Label */}
              <div className={styles.sectionLabel}>{t('boardSection')}</div>

              {/* Chairman */}
              <div className={styles.cardChairman}>
                <div className={styles.cardRole}>{t('chairman')}</div>
                <div className={styles.cardName}>Mehmet Sürkit</div>
              </div>

              {/* Line: Chairman → Board */}
              <div className={`${styles.vline} ${styles.vlineGold}`} style={{ height: 24 }} />
              <div className={styles.boardSpine} />

              {/* Board Members */}
              <div className={styles.boardRow}>
                {/* Vice Chairman */}
                <div className={styles.col}>
                  <div className={`${styles.vline} ${styles.vlineGoldLight}`} style={{ height: 20 }} />
                  <div className={`${styles.card} ${styles.cardBoard}`}>
                    <div className={styles.cardRole}>{t('viceChairman')}</div>
                    <div className={styles.cardName}>İbrahim Onur Sürkit</div>
                  </div>
                </div>
                {/* Board Member 2 */}
                <div className={styles.col}>
                  <div className={`${styles.vline} ${styles.vlineGoldLight}`} style={{ height: 20 }} />
                  <div className={`${styles.card} ${styles.cardBoard}`}>
                    <div className={styles.cardRole}>{t('boardMember')}</div>
                    <div className={styles.cardName}>Aziz Hasan Sürkit</div>
                  </div>
                </div>
                {/* Board Member 3 */}
                <div className={styles.col}>
                  <div className={`${styles.vline} ${styles.vlineGoldLight}`} style={{ height: 20 }} />
                  <div className={`${styles.card} ${styles.cardBoard}`}>
                    <div className={styles.cardRole}>{t('boardMember')}</div>
                    <div className={styles.cardName}>Vaqif Əliyev</div>
                  </div>
                </div>
                {/* Board Member 4 */}
                <div className={styles.col}>
                  <div className={`${styles.vline} ${styles.vlineGoldLight}`} style={{ height: 20 }} />
                  <div className={`${styles.card} ${styles.cardBoard}`}>
                    <div className={styles.cardRole}>{t('boardMember')}</div>
                    <div className={styles.cardName}>Necmi Parlar</div>
                  </div>
                </div>
              </div>

              {/* Line: Board → Director */}
              <div className={`${styles.vline} ${styles.vlineGold}`} style={{ height: 36 }} />

              {/* Director */}
              <div className={`${styles.card} ${styles.cardDirector}`}>
                <div className={styles.cardRole}>{t('director')}</div>
                <div className={styles.cardName}>Vaqif Əliyev</div>
              </div>

              {/* Line: Director → Departments */}
              <div className={`${styles.vline} ${styles.vlineSilver}`} style={{ height: 36 }} />
              <div className={styles.mainSpine} />

              {/* ══ DEPARTMENTS ══ */}
              <div className={styles.deptRow}>

                {/* ── MUHASİBAT ── */}
                <div className={styles.deptCol} style={{ minWidth: 115 }}>
                  <div className={`${styles.vline}`} style={{ height: 28 }} />
                  <div className={`${styles.deptPill} ${styles.dpF}`}>{t('deptAccounting')}</div>
                  <div className={`${styles.card} ${styles.acF}`}>
                    <div className={styles.cardRole}>{t('chiefAccountant')}</div>
                    <div className={styles.cardName}>Hüseyn Quliyev</div>
                  </div>
                  <div className={styles.vline} style={{ height: 13 }} />
                  <div className={`${styles.card} ${styles.cardSub} ${styles.acF}`} style={{ minWidth: 115, maxWidth: 160 }}>
                    <div className={styles.cardRole}>{t('accountant')}</div>
                    <div className={styles.cardName}>Murad Əliyev</div>
                  </div>
                  <div className={styles.vline} style={{ height: 13 }} />
                  <div className={`${styles.card} ${styles.cardSub} ${styles.acF}`} style={{ minWidth: 115, maxWidth: 170 }}>
                    <div className={styles.cardRole}>{t('vehicleMaintenance')}</div>
                    <div className={styles.cardName}>Etibar Quliyev</div>
                  </div>
                </div>

                {/* ── İNSAN RESURSLARI ── */}
                <div className={styles.deptCol} style={{ minWidth: 160 }}>
                  <div className={styles.vline} style={{ height: 28 }} />
                  <div className={`${styles.deptPill} ${styles.dpH}`}>{t('deptHR')}</div>
                  <div className={`${styles.card} ${styles.acH}`} style={{ maxWidth: 185 }}>
                    <div className={styles.cardRole}>{t('hrManager')}</div>
                    <div className={styles.cardName}>Amid Zülfüqarov</div>
                  </div>
                  <div className={styles.vline} style={{ height: 13 }} />
                  <div className={`${styles.card} ${styles.cardSub} ${styles.acH}`} style={{ minWidth: 130, maxWidth: 175 }}>
                    <div className={styles.cardRole}>{t('lawyer')}</div>
                    <div className={styles.cardName}>Gülnur İsmayılova</div>
                  </div>
                </div>

                {/* ── A GRUBU SATIŞ ── */}
                <div className={styles.deptCol} style={{ flex: '2.4', minWidth: 400 }}>
                  <div className={styles.vline} style={{ height: 28 }} />
                  <div className={`${styles.deptPill} ${styles.dpA}`}>{t('deptSalesA')}</div>
                  <div className={`${styles.card} ${styles.acA}`} style={{ minWidth: 115 }}>
                    <div className={styles.cardRole}>{t('salesManagerA')}</div>
                    <div className={styles.cardName}>Cəmil Quliyev</div>
                  </div>
                  <div className={styles.vline} style={{ height: 18 }} />
                  <div className={styles.spine} style={{ width: '100%' }} />
                  <div className={styles.row} style={{ width: '100%', gap: 0 }}>
                    {/* Baş Operator */}
                    <div className={styles.col} style={{ flex: 1, padding: '0 4px' }}>
                      <div className={styles.vline} style={{ height: 20 }} />
                      <div className={`${styles.card} ${styles.cardSub} ${styles.acA}`} style={{ minWidth: 115 }}>
                        <div className={styles.cardRole}>{t('headOperator')}</div>
                        <div className={styles.cardName}>Aidə Seyidova</div>
                      </div>
                    </div>
                    {/* Supervisor 1 → 4 Satıcı */}
                    <div className={styles.col} style={{ flex: 1.7, padding: '0 4px' }}>
                      <div className={styles.vline} style={{ height: 20 }} />
                      <div className={`${styles.card} ${styles.cardSub} ${styles.acA}`} style={{ minWidth: 120 }}>
                        <div className={styles.cardRole}>{t('supervisor')}</div>
                        <div className={styles.cardName}>Vaqif Mehdiyev</div>
                      </div>
                      <div className={styles.vline} style={{ height: 12 }} />
                      <div className={styles.saticiCol}>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acA}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Kərəm Quliyev</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acA}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Nicat Kazımlı</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acA}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Nurxan Məmmədli</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acA}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>İbadulla Yusifov</div></div>
                      </div>
                    </div>
                    {/* Supervisor 2 → 4 Satıcı */}
                    <div className={styles.col} style={{ flex: 1.7, padding: '0 4px' }}>
                      <div className={styles.vline} style={{ height: 20 }} />
                      <div className={`${styles.card} ${styles.cardSub} ${styles.acA}`} style={{ minWidth: 120 }}>
                        <div className={styles.cardRole}>{t('supervisor')}</div>
                        <div className={styles.cardName}>Orxan Rüstəmov</div>
                      </div>
                      <div className={styles.vline} style={{ height: 12 }} />
                      <div className={styles.saticiCol}>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acA}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Ceyhun Xəlilov</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acA}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Araz Qasimov</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acA}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Ehtiram Quliyev</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acA}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Ayaz Mədədov</div></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── B GRUBU SATIŞ ── */}
                <div className={styles.deptCol} style={{ flex: '1.2', minWidth: 230 }}>
                  <div className={styles.vline} style={{ height: 28 }} />
                  <div className={`${styles.deptPill} ${styles.dpB}`}>{t('deptSalesB')}</div>
                  <div className={`${styles.card} ${styles.acB}`} style={{ minWidth: 140 }}>
                    <div className={styles.cardRole}>{t('salesManagerB')}</div>
                    <div className={styles.cardName}>Hafiz Hümbətov</div>
                  </div>
                  <div className={styles.vline} style={{ height: 16 }} />
                  <div className={styles.spine} style={{ width: '100%' }} />
                  <div className={styles.row} style={{ width: '100%', gap: 0 }}>
                    {/* Operator */}
                    <div className={styles.col} style={{ flex: 1, padding: '0 4px' }}>
                      <div className={styles.vline} style={{ height: 18 }} />
                      <div className={`${styles.card} ${styles.cardSub} ${styles.acB}`} style={{ minWidth: 115 }}>
                        <div className={styles.cardRole}>{t('groupOperator')}</div>
                        <div className={styles.cardName}>Zərifə Fərəyeva</div>
                      </div>
                    </div>
                    {/* Satıcılar */}
                    <div className={styles.col} style={{ flex: 1, padding: '0 4px' }}>
                      <div className={styles.vline} style={{ height: 18 }} />
                      <div className={styles.saticiCol}>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acB}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Ruzi Əhmədli</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acB}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Murad Həsənov</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acB}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Elçin Məmmədli</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acB}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Hüseyn Orucov</div></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── C GRUBU SATIŞ ── */}
                <div className={styles.deptCol} style={{ minWidth: 220 }}>
                  <div className={styles.vline} style={{ height: 28 }} />
                  <div className={`${styles.deptPill} ${styles.dpC}`}>{t('deptSalesC')}</div>
                  <div className={`${styles.card} ${styles.acC}`} style={{ maxWidth: 190 }}>
                    <div className={styles.cardRole}>{t('salesManagerC')}</div>
                    <div className={styles.cardName}>Elçin Əlimədanov</div>
                  </div>
                  <div className={styles.vline} style={{ height: 16 }} />
                  <div className={styles.spine} style={{ width: '100%' }} />
                  <div className={styles.row} style={{ width: '100%', gap: 0 }}>
                    {/* Operator */}
                    <div className={styles.col} style={{ flex: 1, padding: '0 4px' }}>
                      <div className={styles.vline} style={{ height: 18 }} />
                      <div className={`${styles.card} ${styles.cardSub} ${styles.acC}`} style={{ minWidth: 115 }}>
                        <div className={styles.cardRole}>{t('groupOperator')}</div>
                        <div className={styles.cardName}>Şəhla Rzayeva</div>
                      </div>
                    </div>
                    {/* Satıcılar */}
                    <div className={styles.col} style={{ flex: 1, padding: '0 4px' }}>
                      <div className={styles.vline} style={{ height: 18 }} />
                      <div className={styles.saticiCol}>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acC}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Rəşad Talıbov</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acC}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Rəvan Məmmədov</div></div>
                        <div className={`${styles.card} ${styles.cardSatici} ${styles.acC}`}><div className={styles.cardRole}>{t('salesperson')}</div><div className={styles.cardName}>Səxavət Həsənov</div></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── LOJİSTİK & DEPO ── */}
                <div className={styles.deptCol} style={{ minWidth: 155 }}>
                  <div className={styles.vline} style={{ height: 28 }} />
                  <div className={`${styles.deptPill} ${styles.dpL}`}>{t('deptLogistics')}</div>
                  <div className={styles.col} style={{ gap: 8 }}>
                    <div className={`${styles.card} ${styles.acL}`} style={{ maxWidth: 175 }}>
                      <div className={styles.cardRole}>{t('logisticsManagerA')}</div>
                      <div className={styles.cardName}>Cavid Eylazlı</div>
                    </div>
                    <div className={`${styles.card} ${styles.acL}`} style={{ maxWidth: 175 }}>
                      <div className={styles.cardRole}>{t('logisticsManagerB')}</div>
                      <div className={styles.cardName}>Samiddin Mikayılov</div>
                    </div>
                    <div className={`${styles.card} ${styles.acL}`} style={{ maxWidth: 175 }}>
                      <div className={styles.cardRole}>{t('logisticsManagerC')}</div>
                      <div className={styles.cardName}>Əsədullayev Bəxtiyar</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* ══ LEGEND ══ */}
              <div className={styles.legend}>
                <span className={styles.legendTitle}>{t('legendTitle')}</span>
                <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: 'var(--gold)' }} />{t('legendBoard')}</div>
                <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#935116' }} />{t('deptAccounting')}</div>
                <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#117a65' }} />{t('legendHRLaw')}</div>
                <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#1a5276' }} />{t('deptSalesA')}</div>
                <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#145a32' }} />{t('deptSalesB')}</div>
                <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#6c3483' }} />{t('deptSalesC')}</div>
                <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#0e6655' }} />{t('deptLogistics')}</div>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
