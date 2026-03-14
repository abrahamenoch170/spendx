import { create } from 'zustand';

interface Plan {
  id: string;
  name: string;
  date: string;
  location: string;
}

interface BudgetEntry {
  id: string;
  name: string;
  amount: number;
  suggestion?: number;
  confidence?: number; // 1-5
}

interface Reminder {
  id: string;
  text: string;
  time: string;
}

interface Trip {
  id: string;
  thumbnail: string;
  date: string;
  location: string;
}

interface PlanStore {
  plans: Plan[];
  chatHistory: { id: string; sender: 'user' | 'ai'; text: string; isItinerary?: boolean }[];
  budgets: BudgetEntry[];
  reminders: Reminder[];
  tripHistory: Trip[];
  availability: {
    user: number[]; // 0-23 hours
    duoPartner: number[];
    squadMembers: number[][];
    teamMembers: number[][];
  };
  addChatMessage: (message: { id: string; sender: 'user' | 'ai'; text: string; isItinerary?: boolean }) => void;
  addBudgetEntry: (entry: BudgetEntry) => void;
  updateBudgetEntry: (id: string, amount: number) => void;
  addReminder: (reminder: Reminder) => void;
  setAvailability: (availability: PlanStore['availability']) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
  plans: [],
  chatHistory: [
    { id: '1', sender: 'ai', text: 'Hello! How can I help you plan your next Spendx adventure?' },
  ],
  budgets: [
    { id: 'b1', name: 'Food', amount: 0, suggestion: 25, confidence: 4 },
    { id: 'b2', name: 'Transport', amount: 0, suggestion: 15, confidence: 3 },
    { id: 'b3', name: 'Entertainment', amount: 0, suggestion: 10, confidence: 5 },
    { id: 'b4', name: 'Others', amount: 0, suggestion: 8, confidence: 2 },
  ],
  reminders: [
    { id: 'r1', text: 'Coffee with Alex', time: '10:00 AM' },
  ],
  tripHistory: [
    { id: 't1', thumbnail: 'https://picsum.photos/seed/trip1/200/200', date: 'Feb 2026', location: 'Paris' },
    { id: 't2', thumbnail: 'https://picsum.photos/seed/trip2/200/200', date: 'Jan 2026', location: 'Tokyo' },
  ],
  availability: {
    user: Array.from({ length: 24 }, () => Math.random() > 0.5 ? 1 : 0),
    duoPartner: Array.from({ length: 24 }, () => Math.random() > 0.5 ? 1 : 0),
    squadMembers: Array.from({ length: 3 }, () => Array.from({ length: 24 }, () => Math.random() > 0.5 ? 1 : 0)),
    teamMembers: Array.from({ length: 5 }, () => Array.from({ length: 24 }, () => Math.random() > 0.5 ? 1 : 0)),
  },
  addChatMessage: (message) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  addBudgetEntry: (entry) => set((state) => ({ budgets: [...state.budgets, entry] })),
  updateBudgetEntry: (id, amount) => set((state) => ({
    budgets: state.budgets.map(b => b.id === id ? { ...b, amount } : b)
  })),
  addReminder: (reminder) => set((state) => ({ reminders: [...state.reminders, reminder] })),
  setAvailability: (availability) => set({ availability }),
}));
