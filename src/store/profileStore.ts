import { create } from 'zustand';

interface UserProfile {
  username: string;
  city: string;
  memberSince: string;
  tier: 'silver' | 'blue' | 'gold';
  stats: {
    spendxsCompleted: number;
    totalSaved: number;
    citiesExplored: number;
    squadSize: number;
  };
}

interface Achievement {
  id: string;
  title: string;
  unlocked: boolean;
  progress: number;
}

interface ShareLink {
  id: string;
  url: string;
  title: string;
}

interface Trip {
  id: string;
  thumbnail: string;
  date: string;
  location: string;
}

interface ProfileStore {
  userProfile: UserProfile;
  achievements: Achievement[];
  shareLinks: ShareLink[];
  pastTrips: Trip[];
  setAchievements: (achievements: Achievement[]) => void;
  setShareLinks: (shareLinks: ShareLink[]) => void;
  setPastTrips: (pastTrips: Trip[]) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  userProfile: {
    username: 'AbeEnoch',
    city: 'Lagos',
    memberSince: 'March 2025',
    tier: 'gold',
    stats: {
      spendxsCompleted: 124,
      totalSaved: 45000,
      citiesExplored: 5,
      squadSize: 12,
    },
  },
  achievements: [
    { id: 'a1', title: 'First Spendx', unlocked: true, progress: 100 },
    { id: 'a2', title: 'City Explorer', unlocked: false, progress: 60 },
    { id: 'a3', title: 'Squad Leader', unlocked: true, progress: 100 },
    { id: 'a4', title: 'Budget Master', unlocked: false, progress: 30 },
    { id: 'a5', title: 'Night Owl', unlocked: true, progress: 100 },
    { id: 'a6', title: 'Culture Buff', unlocked: false, progress: 10 },
    { id: 'a7', title: 'Nature Lover', unlocked: false, progress: 0 },
    { id: 'a8', title: 'Social Butterfly', unlocked: true, progress: 100 },
    { id: 'a9', title: 'Hidden Gem Finder', unlocked: false, progress: 50 },
  ],
  shareLinks: [
    { id: 'l1', url: 'spendx.io/trip/1', title: 'Lagos Weekend' },
    { id: 'l2', url: 'spendx.io/trip/2', title: 'Art Gallery Tour' },
  ],
  pastTrips: [
    { id: 't1', thumbnail: 'https://picsum.photos/seed/trip1/200/200', date: 'Feb 2026', location: 'Lagos' },
    { id: 't2', thumbnail: 'https://picsum.photos/seed/trip2/200/200', date: 'Jan 2026', location: 'Abuja' },
  ],
  setAchievements: (achievements) => set({ achievements }),
  setShareLinks: (shareLinks) => set({ shareLinks }),
  setPastTrips: (pastTrips) => set({ pastTrips }),
}));
