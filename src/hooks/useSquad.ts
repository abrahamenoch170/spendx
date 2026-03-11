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
    const newSquad = generateMockSquad(center[0], center[1]);
    setSquad(newSquad);

    // Preload avatars
    newSquad.forEach(member => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.seed}`;
      document.head.appendChild(link);
    });
  }, [center]);

  return { squad };
}
