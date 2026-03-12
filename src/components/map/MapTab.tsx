'use client';
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol } from 'pmtiles';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion';
import { Target, Sliders, Eye } from 'lucide-react';

export const MapTab = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (map.current) return;

    const protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: {
        version: 8,
        sources: {
          'protomaps': {
            type: 'vector',
            url: 'pmtiles://https://protomaps.github.io/PMTiles/protomaps(vector)ODbL_firenze.pmtiles'
          },
          'venues': {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] }
          }
        },
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: { 'background-color': theme === 'dark' ? '#0A0A0A' : '#F5F5F5' }
          },
          {
            id: 'venue-pins',
            type: 'circle',
            source: 'venues',
            paint: {
              'circle-radius': 8,
              'circle-color': [
                'match',
                ['get', 'category'],
                'food', '#FF9F1C',
                'drink', '#FF00FF',
                'event', '#00FFFF',
                'experience', '#008080',
                'health', '#FF0000',
                '#808080'
              ]
            }
          }
        ]
      },
      center: [11.25, 43.77],
      zoom: 12
    });

    // Add user marker
    const el = document.createElement('div');
    el.className = 'w-10 h-10 rounded-full border-4 border-[var(--lime)] animate-pulse';
    el.style.backgroundImage = 'url(https://api.dicebear.com/7.x/pixel-art/svg?seed=user)';
    const marker = new maplibregl.Marker(el).setLngLat([11.25, 43.77]).addTo(map.current);

    // Geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.current?.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]);
      },
      async (error) => {
        console.warn("Geolocation failed, attempting server-side IP fallback:", error.message);
        try {
          const response = await fetch('/api/location/ip');
          if (!response.ok) throw new Error('IP fallback failed');
          const data = await response.json();
          if (data.latitude && data.longitude) {
            map.current?.setCenter([data.longitude, data.latitude]);
            marker.setLngLat([data.longitude, data.latitude]);
          } else {
            throw new Error('IP data incomplete');
          }
        } catch (ipError) {
          console.error("IP fallback error:", ipError);
        }
      }
    );

    map.current.on('moveend', () => {
      const bounds = map.current?.getBounds();
      if (bounds) fetchVenues(bounds);
    });

    map.current.on('click', 'venue-pins', (e) => {
      const feature = e.features?.[0];
      if (feature) {
        console.log("Clicked venue:", feature.properties);
        // Here we would open the bottom sheet
      }
    });

    return () => map.current?.remove();
  }, [theme]);

  const fetchVenues = async (bounds: maplibregl.LngLatBounds, retries = 3) => {
    try {
      const url = `/api/venues/fetch-for-city?city_slug=firenze&minLat=${bounds.getSouth()}&maxLat=${bounds.getNorth()}&minLng=${bounds.getWest()}&maxLng=${bounds.getEast()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch venues: ${response.statusText}`);
      const data = await response.json();
      
      if (data.success) {
        const geojson = {
          type: 'FeatureCollection',
          features: data.venues.map((v: any) => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [v.lng, v.lat] },
            properties: { ...v }
          }))
        };
        (map.current?.getSource('venues') as any)?.setData(geojson);
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
      if (retries > 0) {
        console.log(`Retrying venue fetch... (${retries} left)`);
        setTimeout(() => fetchVenues(bounds, retries - 1), 1000);
      }
    }
  };

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
      
      {/* Floating Buttons */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-3">
        <button className="p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)]"><Target /></button>
        <button className="p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)]"><Sliders /></button>
        <button className="p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)]"><Eye /></button>
      </div>

      {/* Bottom Sheet */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-[var(--card-bg)] rounded-t-3xl p-6 border-t border-[var(--border-color)]"
        initial={{ y: '80%' }}
        animate={{ y: '0%' }}
      >
        <h2 className="text-xl font-bold">Tonight's Vibe</h2>
        <p className="text-[var(--text-secondary)]">5 squad active · 2 spots open</p>
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {[1, 2, 3, 4].map(i => <div key={i} className="w-12 h-12 rounded-full bg-[var(--border-color)]" />)}
        </div>
      </motion.div>
    </div>
  );
};
