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
      radius: 50,
      blur: 40,
      maxZoom: 15,
      gradient: {
        0.4: 'rgba(0,0,0,0)',
        0.6: '#00BFA5', // Teal
        0.8: '#00E5FF', // Cyan
        1.0: '#FF2D78'  // Magenta
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}
