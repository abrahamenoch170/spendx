import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChronosEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  attendees: string[];
}

interface ChronosStore {
  events: ChronosEvent[];
  addEvent: (event: ChronosEvent) => void;
  removeEvent: (id: string) => void;
}

export const useChronosStore = create<ChronosStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      removeEvent: (id) => set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
    }),
    {
      name: 'chronos-storage',
    }
  )
);
