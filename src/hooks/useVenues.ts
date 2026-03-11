import { useState, useEffect } from 'react';

export interface Venue {
  id: string;
  name: string;
  type: 'food' | 'culture' | 'nature' | 'nightlife' | 'hidden';
  status: 'open' | 'closing' | 'closed' | 'unavailable';
  lat: number;
  lng: number;
  vibe: number; // 0-100
}

const generateMockVenues = (centerLat: number, centerLng: number): Venue[] => {
  const types: Venue['type'][] = ['food', 'culture', 'nature', 'nightlife', 'hidden'];
  const statuses: Venue['status'][] = ['open', 'closing', 'closed', 'unavailable'];
  
  return Array.from({ length: 8 }).map((_, i) => ({
    id: `venue-${i}`,
    name: `Venue ${i + 1}`,
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    lat: centerLat + (Math.random() - 0.5) * 0.03,
    lng: centerLng + (Math.random() - 0.5) * 0.03,
    vibe: Math.floor(Math.random() * 100),
  }));
};

export function useVenues(center: [number, number]) {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    setVenues(generateMockVenues(center[0], center[1]));
  }, [center]);

  return { venues };
}
