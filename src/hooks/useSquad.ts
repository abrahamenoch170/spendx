import { useState, useEffect } from 'react';

export interface SquadMember {
  id: string;
  name: string;
  seed: string;
  lat: number;
  lng: number;
  freshness: 'full' | 'partial' | 'dashed'; // <2 min, 5 min, 10 min+
  direction: number; // degrees
}

const generateMockSquad = (centerLat: number, centerLng: number): SquadMember[] => {
  const names = ['zara', 'kobe', 'nova', 'felix', 'aneka'];
  return names.map((name, i) => ({
    id: `squad-${i}`,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    seed: name,
    lat: centerLat + (Math.random() - 0.5) * 0.02,
    lng: centerLng + (Math.random() - 0.5) * 0.02,
    freshness: i % 3 === 0 ? 'full' : i % 3 === 1 ? 'partial' : 'dashed',
    direction: Math.floor(Math.random() * 360),
  }));
};

export function useSquad(center: [number, number]) {
  const [squad, setSquad] = useState<SquadMember[]>([]);

  useEffect(() => {
    setSquad(generateMockSquad(center[0], center[1]));
  }, [center]);

  return { squad };
}
