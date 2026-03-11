import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

export function HeatmapLayer({ points }: { points: [number, number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    // @ts-ignore
    const heat = L.heatLayer(points, {
      radius: 40,
      blur: 30,
      maxZoom: 15,
      gradient: {
        0.4: '#0A0A0A',
        0.6: '#00AA88',
        0.8: '#00CCFF',
        1.0: '#FF0099'
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}
