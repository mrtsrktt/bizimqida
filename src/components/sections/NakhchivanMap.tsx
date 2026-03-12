'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './NakhchivanMap.module.css';

const HUB = { lat: 39.2092, lng: 45.4122, name: 'Naxçıvan' };

const cities = [
  { lat: 39.7105, lng: 44.8850, name: 'Sədərək' },
  { lat: 39.5536, lng: 44.9839, name: 'Şərur' },
  { lat: 39.3872, lng: 45.1641, name: 'Kəngərli' },
  { lat: 39.1508, lng: 45.4470, name: 'Babək' },
  { lat: 38.9614, lng: 45.6294, name: 'Culfa' },
  { lat: 38.9070, lng: 46.0230, name: 'Ordubad' },
  { lat: 39.4000, lng: 45.5800, name: 'Şahbuz' },
];

export default function NakhchivanMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || loaded) return;

    const init = async () => {
      const L = (await import('leaflet')).default;

      const map = L.map(mapRef.current!, {
        center: [39.25, 45.45],
        zoom: 9,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true,
      });

      // Dark tile layer
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 13, minZoom: 8 }
      ).addTo(map);

      // Custom gold marker icon
      const goldIcon = L.divIcon({
        className: styles.goldMarker,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      // Hub marker (larger)
      const hubIcon = L.divIcon({
        className: styles.hubMarker,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      // Add hub marker
      L.marker([HUB.lat, HUB.lng], { icon: hubIcon })
        .addTo(map)
        .bindTooltip(HUB.name, {
          permanent: true,
          direction: 'top',
          offset: [0, -14],
          className: styles.hubTooltip,
        });

      // Add city markers with animated polylines
      cities.forEach((city, i) => {
        // Marker
        L.marker([city.lat, city.lng], { icon: goldIcon })
          .addTo(map)
          .bindTooltip(city.name, {
            permanent: true,
            direction: 'top',
            offset: [0, -10],
            className: styles.cityTooltip,
          });

        // Polyline from hub to city
        const latlngs: [number, number][] = [
          [HUB.lat, HUB.lng],
          [city.lat, city.lng],
        ];

        const polyline = L.polyline(latlngs, {
          color: '#C8A951',
          weight: 2,
          opacity: 0.5,
          dashArray: '8, 6',
        }).addTo(map);

        // Animate: start hidden, reveal after delay
        const el = polyline.getElement() as SVGElement | null;
        if (el) {
          const svgPath = el as unknown as SVGPathElement;
          const length = svgPath.getTotalLength?.() || 500;
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;
          el.style.transition = `stroke-dashoffset 1.2s ease ${0.5 + i * 0.2}s`;
          setTimeout(() => {
            el.style.strokeDashoffset = '0';
          }, 100);
        }
      });

      setLoaded(true);
    };

    // Observe visibility
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
