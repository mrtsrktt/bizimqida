'use client';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from './NakhchivanMap.module.css';

interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  pct: number;
  isHub?: boolean;
  labelOffset?: { dx: number; dy: number };
}

const HUB = { x: 420, y: 275 };

const cities: City[] = [
  { id: 'sadarak', name: 'Sədərək', x: 105, y: 130, pct: 55, labelOffset: { dx: 0, dy: -14 } },
  { id: 'sharur', name: 'Şərur', x: 210, y: 170, pct: 75, labelOffset: { dx: 0, dy: -14 } },
  { id: 'kangarli', name: 'Kəngərli', x: 330, y: 195, pct: 65, labelOffset: { dx: 0, dy: -14 } },
  { id: 'babek', name: 'Babək', x: 385, y: 225, pct: 60, labelOffset: { dx: -40, dy: 5 } },
  { id: 'nakhchivan', name: 'Naxçıvan', x: HUB.x, y: HUB.y, pct: 95, isHub: true, labelOffset: { dx: 0, dy: -24 } },
  { id: 'julfa', name: 'Culfa', x: 530, y: 340, pct: 70, labelOffset: { dx: 0, dy: -14 } },
  { id: 'ordubad', name: 'Ordubad', x: 675, y: 385, pct: 80, labelOffset: { dx: 0, dy: -14 } },
];

const nonHubCities = cities.filter(c => !c.isHub);

// Simplified Nakhchivan AR outline
const OUTLINE_PATH = `
  M 65,145
  C 70,125 80,115 95,105
  L 135,100
  C 160,95 185,100 220,110
  L 280,130
  C 320,140 350,150 380,165
  L 440,195
  C 475,210 510,230 545,260
  L 590,295
  C 620,315 650,340 680,360
  L 720,385
  C 735,395 740,410 730,425
  L 710,435
  C 690,440 665,430 640,415
  L 590,380
  C 555,360 525,345 500,335
  L 450,310
  C 420,300 390,285 360,270
  L 300,240
  C 260,225 220,210 180,195
  L 130,175
  C 105,168 85,160 70,155
  Z
`;

// District boundary lines (simplified)
const DISTRICT_BOUNDARIES = [
  // Sadarak | Sharur
  'M 152,98 L 145,180',
  // Sharur | Kangarli
  'M 275,128 L 262,220',
  // Kangarli | Babek
  'M 375,163 L 355,268',
  // Babek/Nakhchivan | Julfa
  'M 475,215 L 495,338',
  // Julfa | Ordubad
  'M 625,340 L 610,425',
];

export default function NakhchivanMap() {
  const t = useTranslations('distribution');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const getRouteLength = (city: City) =>
    Math.hypot(city.x - HUB.x, city.y - HUB.y);

  const hoveredData = cities.find(c => c.id === hoveredCity);

  return (
    <div
      ref={mapRef}
      className={`${styles.mapContainer} ${isVisible ? styles.active : ''}`}
    >
      <h3 className={styles.mapTitle}>{t('mapTitle')}</h3>
      <div className={styles.gridOverlay} />

      <div className={styles.svgWrap}>
        <svg viewBox="0 0 800 500" className={styles.mapSvg}>
          <defs>
            {/* Hub glow filter */}
            <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Map outline */}
          <path
            d={OUTLINE_PATH}
            className={styles.regionOutline}
          />

          {/* District boundaries */}
          {DISTRICT_BOUNDARIES.map((d, i) => (
            <path
              key={`boundary-${i}`}
              d={d}
              className={styles.districtBoundary}
            />
          ))}

          {/* Route lines from hub to each city */}
          {nonHubCities.map((city, i) => {
            const len = getRouteLength(city);
            return (
              <line
                key={`route-${city.id}`}
                x1={HUB.x}
                y1={HUB.y}
                x2={city.x}
                y2={city.y}
                className={`${styles.routeLine} ${
                  hoveredCity === city.id ? styles.routeHighlight : ''
                }`}
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: isVisible ? 0 : len,
                  transitionDelay: isVisible ? `${1.0 + i * 0.2}s` : '0s',
                }}
              />
            );
          })}

          {/* Hub marker */}
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="16"
            className={styles.hubOuter}
          />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="8"
            className={styles.hubInner}
            filter="url(#hubGlow)"
          />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="16"
            className={styles.hubPulse}
          />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="16"
            className={styles.hubPulse2}
          />

          {/* City dots (non-hub) */}
          {nonHubCities.map((city, i) => (
            <circle
              key={`dot-${city.id}`}
              cx={city.x}
              cy={city.y}
              r="5"
              className={`${styles.cityDot} ${
                hoveredCity === city.id ? styles.cityDotHover : ''
              }`}
              style={{
                animationDelay: isVisible ? `${1.3 + i * 0.2}s` : '0s',
              }}
              onMouseEnter={() => setHoveredCity(city.id)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() => setHoveredCity(hoveredCity === city.id ? null : city.id)}
            />
          ))}

          {/* City labels */}
          {cities.map((city, i) => (
            <text
              key={`label-${city.id}`}
              x={city.x + (city.labelOffset?.dx || 0)}
              y={city.y + (city.labelOffset?.dy || -14)}
              className={`${styles.cityLabel} ${
                city.isHub ? styles.hubLabel : ''
              } ${hoveredCity === city.id ? styles.labelHighlight : ''}`}
              style={{
                animationDelay: isVisible ? `${city.isHub ? 1.0 : 1.6 + i * 0.2}s` : '0s',
              }}
            >
              {city.name}
            </text>
          ))}
        </svg>
      </div>

      {/* Hover info bar */}
      <div className={`${styles.infoBar} ${hoveredData ? styles.infoBarActive : ''}`}>
        {hoveredData ? (
          <>
            <span className={styles.infoCityName}>{hoveredData.name}</span>
            <div className={styles.infoDivider} />
            <span className={styles.infoPct}>{hoveredData.pct}%</span>
            <span className={styles.infoLabel}>{t('mapTooltipCoverage')}</span>
          </>
        ) : (
          <span className={styles.infoPrompt}>{t('mapHoverPrompt')}</span>
        )}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendHub} />
          {t('mapLegendHub')}
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendRoute} />
          {t('mapLegendRoute')}
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendCity} />
          {t('mapLegendCity')}
        </div>
      </div>
    </div>
  );
}
