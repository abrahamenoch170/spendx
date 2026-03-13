import { create } from 'zustand';

export type Mode = 'group' | 'solo' | 'stealth' | 'emergency' | 'discovery';

export interface Alarm {
  id: string;
  description: string;
  time: string;
  date: string;
  enabled: boolean;
}

interface User {
  id: string;
  name: string;
  username: string;
  avatarSeed: string;
  tier: 'silver' | 'blue' | 'gold';
  tokensRemaining: number;
  streak: number;
  points: number;
  city: string;
  memberSince: string;
}

interface Plan {
  id: string;
  name: string;
  stops: string[];
  route: any[];
  createdAt: string;
  status: 'planned' | 'active' | 'completed';
}

interface Squad {
  id: string;
  name: string;
  members: string[];
  messages: { id: string; sender: string; text: string }[];
  activePlan: string | null;
}

interface AppStore {
  user: User;
  activeMode: Mode;
  plans: Plan[];
  alarms: Alarm[];
  squads: Squad[];
  locations: Record<string, { lat: number; lng: number; timestamp: number }>;
  achievements: { unlockedTattoos: string[]; progress: Record<string, number> };
  
  setActiveMode: (mode: Mode) => void;
  addPlan: (plan: Plan) => void;
  updatePlanStops: (planId: string, stops: string[]) => void;
  addAlarm: (alarm: Alarm) => void;
  toggleAlarm: (id: string) => void;
  deleteAlarm: (id: string) => void;
  addMessage: (squadId: string, message: { id: string; sender: string; text: string }) => void;
  updateLocation: (userId: string, lat: number, lng: number) => void;
  unlockAchievement: (tattoo: string) => void;
  addSquadMember: (squadId: string, memberId: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: {
    id: 'u1',
    name: 'Abraham Enoch',
    username: 'AbeEnoch',
    avatarSeed: 'AbeEnoch',
    tier: 'gold',
    tokensRemaining: 500,
    streak: 12,
    points: 1250,
    city: 'Lagos',
    memberSince: 'March 2025',
  },
  activeMode: 'group',
  plans: [
    { id: 'p1', name: 'Lagos Weekend', stops: ['Venue A', 'Venue B'], route: [], createdAt: '2026-03-01', status: 'planned' }
  ],
  alarms: [
    { id: 'a1', description: 'Morning Run', time: '07:00', date: '2026-03-14', enabled: true }
  ],
  squads: [
    { id: 'sq1', name: 'Tech Squad', members: ['u1', 'u2'], messages: [], activePlan: 'p1' }
  ],
  locations: {},
  achievements: { unlockedTattoos: ['tattoo1'], progress: { 'tattoo2': 50 } },

  setActiveMode: (activeMode) => set({ activeMode }),
  addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
  updatePlanStops: (planId, stops) => set((state) => ({
    plans: state.plans.map(p => p.id === planId ? { ...p, stops } : p)
  })),
  addAlarm: (alarm) => set((state) => ({ alarms: [...state.alarms, alarm] })),
  toggleAlarm: (id) => set((state) => ({
    alarms: state.alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a)
  })),
  deleteAlarm: (id) => set((state) => ({ alarms: state.alarms.filter(a => a.id !== id) })),
  addMessage: (squadId, message) => set((state) => ({
    squads: state.squads.map(s => s.id === squadId ? { ...s, messages: [...s.messages, message] } : s)
  })),
  updateLocation: (userId, lat, lng) => set((state) => ({
    locations: { ...state.locations, [userId]: { lat, lng, timestamp: Date.now() } }
  })),
  unlockAchievement: (tattoo) => set((state) => ({
    achievements: { ...state.achievements, unlockedTattoos: [...state.achievements.unlockedTattoos, tattoo] }
  })),
  addSquadMember: (squadId, memberId) => set((state) => ({
    squads: state.squads.map(s => s.id === squadId ? { ...s, members: [...s.members, memberId] } : s)
  })),
}));
