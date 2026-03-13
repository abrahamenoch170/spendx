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
  addChatMessage: (message: { id: string; sender: 'user' | 'ai'; text: string; isItinerary?: boolean }) => void;
  addBudgetEntry: (entry: BudgetEntry) => void;
  addReminder: (reminder: Reminder) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
  plans: [],
  chatHistory: [
    { id: '1', sender: 'ai', text: 'Hello! How can I help you plan your next Spendx adventure?' },
  ],
  budgets: [
    { id: 'b1', name: 'Dinner', amount: 45 },
    { id: 'b2', name: 'Taxi', amount: 15 },
  ],
  reminders: [
    { id: 'r1', text: 'Coffee with Alex', time: '10:00 AM' },
  ],
  tripHistory: [
    { id: 't1', thumbnail: 'https://picsum.photos/seed/trip1/200/200', date: 'Feb 2026', location: 'Paris' },
    { id: 't2', thumbnail: 'https://picsum.photos/seed/trip2/200/200', date: 'Jan 2026', location: 'Tokyo' },
  ],
  addChatMessage: (message) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  addBudgetEntry: (entry) => set((state) => ({ budgets: [...state.budgets, entry] })),
  addReminder: (reminder) => set((state) => ({ reminders: [...state.reminders, reminder] })),
}));
