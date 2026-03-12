'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './NakhchivanMap.module.css';

const HUB = { lat: 39.2092, lng: 45.4122, name: 'Naxçıvan' };

const cities = [
  { lat: 39.5553, lng: 44.9839, name: 'Şərur' },
  { lat: 39.3897, lng: 45.1603, name: 'Kəngərli' },
  { lat: 39.1514, lng: 45.4489, name: 'Babək' },
  { lat: 38.9583, lng: 45.6317, name: 'Culfa' },
  { lat: 38.9022, lng: 46.0236, name: 'Ordubad' },
  { lat: 39.7197, lng: 44.8797, name: 'Sədərək' },
  { lat: 39.4078, lng: 45.5706, name: 'Şahbuz' },
];

// Real Nakhchivan AR boundary (user-provided GeoJSON, converted from [lng,lat] to [lat,lng])
const nakhchivanBoundary: [number, number][] = [
  [39.75, 45.00], [39.72, 45.15], [39.65, 45.30], [39.58, 45.45],
  [39.52, 45.55], [39.45, 45.62], [39.38, 45.70], [39.30, 45.75],
  [39.22, 45.82], [39.10, 45.90], [38.95, 46.10], [38.90, 46.20],
  [38.85, 46.15], [38.82, 45.95], [38.88, 45.75], [38.95, 45.55],
  [39.05, 45.40], [39.15, 45.25], [39.28, 45.10], [39.42, 44.95],
  [39.55, 44.88], [39.65, 44.90], [39.70, 44.95], [39.75, 45.00],
];

// World rectangle for masking outside the polygon
const worldBounds: [number, number][] = [
  [-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180],
];

export default function NakhchivanMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || loaded) return;

    const init = async () => {
      const L = (await import('leaflet')).default;

      const map = L.map(mapRef.current!, {
        center: [39.25, 45.25],
        zoom: 9.2,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      // Standard tile layer — styled via CSS filter
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 13, minZoom: 8 }
      ).addTo(map);

      // Darken area OUTSIDE Nakhchivan — polygon with hole
      L.polygon([worldBounds, nakhchivanBoundary], {
        fillColor: 'rgba(8, 20, 41, 1)',
        fillOpacity: 0.55,
        stroke: false,
        interactive: false,
      }).addTo(map);

      // Nakhchivan boundary polygon (gold border + subtle fill)
      L.polygon(nakhchivanBoundary, {
        fillColor: 'rgba(200, 169, 81, 0.15)',
        fillOpacity: 1,
        color: '#C8A951',
        weight: 2.5,
        opacity: 0.8,
      }).addTo(map);

      // Hub marker — appears first with delay
      const hubIcon = L.divIcon({
        className: styles.hubMarker,
        html: `<div class="${styles.hubPulseRing}"></div><div class="${styles.hubDot}"></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      setTimeout(() => {
        const hubMarker = L.marker([HUB.lat, HUB.lng], { icon: hubIcon }).addTo(map);
        hubMarker.bindTooltip(HUB.name, {
          permanent: true,
          direction: 'top',
          offset: [0, -22],
          className: styles.hubTooltip,
        });
      }, 500);

      // City markers + polylines with staggered animation
      cities.forEach((city, i) => {
        const delay = 800 + i * 300;

        // Polyline from hub to city
        setTimeout(() => {
          const latlngs: [number, number][] = [
            [HUB.lat, HUB.lng],
            [city.lat, city.lng],
          ];

          const polyline = L.polyline(latlngs, {
            color: '#C8A951',
            weight: 2,
            opacity: 0.5,
            dashArray: '8, 6',
            className: styles.animatedLine,
          }).addTo(map);

          // Animate the dash
          const el = polyline.getElement() as SVGElement | null;
          if (el) {
            el.classList.add(styles.dashAnimate);
          }
        }, delay);

        // City marker with fade-in
        setTimeout(() => {
          const cityIcon = L.divIcon({
            className: `${styles.cityMarker} ${styles.fadeIn}`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          });

          L.marker([city.lat, city.lng], { icon: cityIcon })
            .addTo(map)
            .bindTooltip(city.name, {
              permanent: true,
              direction: 'top',
              offset: [0, -10],
              className: `${styles.cityTooltip} ${styles.fadeIn}`,
            });
        }, delay + 200);
      });

      setLoaded(true);
    };

    // Observe visibility before init
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          init();
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(mapRef.current);
    return () => obs.disconnect();
  }, [loaded]);

  return (
    <div className={styles.mapContainer}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={mapRef} className={styles.leafletMap} />
    </div>
  );
}
