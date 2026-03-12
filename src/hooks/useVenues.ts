import { useState, useEffect } from 'react';

export interface Venue {
  id: string;
  name: string;
  type: 'food' | 'drink' | 'event' | 'experience' | 'health';
  status: 'open' | 'closing' | 'closed' | 'unavailable';
  lat: number;
  lng: number;
  vibe: number; // 0-100
  visitedLastTwoHours: boolean;
}

const generateMockVenues = (centerLat: number, centerLng: number): Venue[] => {
  const types: Venue['type'][] = ['food', 'drink', 'event', 'experience', 'health'];
  const statuses: Venue['status'][] = ['open', 'closing', 'closed', 'unavailable'];
  
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `venue-${i}`,
    name: `Spot ${i + 1}`,
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    lat: centerLat + (Math.random() - 0.5) * 0.03,
    lng: centerLng + (Math.random() - 0.5) * 0.03,
    vibe: Math.floor(Math.random() * 100),
    visitedLastTwoHours: Math.random() > 0.5,
  }));
};

export function useVenues(center: [number, number]) {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    setVenues(generateMockVenues(center[0], center[1]));
  }, [center]);

  return { venues };
}
