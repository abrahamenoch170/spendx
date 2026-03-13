import { create } from 'zustand';

interface HomeStore {
  userProfile: {
    username: string;
    streak: number;
    points: number;
    rank: number;
    totalUsers: number;
  };
  leaderboard: { id: string; username: string; avatarSeed: string; rank: number }[];
  venues: { id: string; name: string; vibeScore: number; image: string }[];
  events: { id: string; name: string; date: string; image: string }[];
  activeMode: string;
  notifications: number;
  setActiveMode: (mode: string) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  userProfile: {
    username: 'Abraham',
    streak: 7,
    points: 1280,
    rank: 42,
    totalUsers: 1203,
  },
  leaderboard: [
    { id: '1', username: 'Alex', avatarSeed: '1', rank: 1 },
    { id: '2', username: 'Sam', avatarSeed: '2', rank: 2 },
    { id: '3', username: 'Jordan', avatarSeed: '3', rank: 3 },
  ],
  venues: [
    { id: 'v1', name: 'The Velvet Room', vibeScore: 94, image: 'https://picsum.photos/seed/venue1/200/200' },
    { id: 'v2', name: 'Neon Nights', vibeScore: 89, image: 'https://picsum.photos/seed/venue2/200/200' },
    { id: 'v3', name: 'Echo Lounge', vibeScore: 91, image: 'https://picsum.photos/seed/venue3/200/200' },
  ],
  events: [
    { id: 'e1', name: 'Tech Mixer', date: 'Tonight, 8 PM', image: 'https://picsum.photos/seed/event1/200/200' },
    { id: 'e2', name: 'Art Gallery Opening', date: 'Tomorrow, 6 PM', image: 'https://picsum.photos/seed/event2/200/200' },
  ],
  activeMode: 'solo',
  notifications: 3,
  setActiveMode: (mode) => set({ activeMode: mode }),
}));
