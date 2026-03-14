import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OfflineAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

interface OfflineQueueStore {
  offlineQueue: OfflineAction[];
  addToQueue: (action: Omit<OfflineAction, 'id' | 'timestamp'>) => void;
  processQueue: () => void;
  clearQueue: () => void;
}

export const useOfflineQueueStore = create<OfflineQueueStore>()(
  persist(
    (set, get) => ({
      offlineQueue: [],
      addToQueue: (action) => {
        set((state) => ({
          offlineQueue: [
            ...state.offlineQueue,
            { ...action, id: Math.random().toString(36).substr(2, 9), timestamp: Date.now() },
          ],
        }));
      },
      processQueue: async () => {
        const { offlineQueue } = get();
        if (offlineQueue.length === 0) return;

        console.log(`Processing ${offlineQueue.length} offline actions...`);
        
        // Simulate processing
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log('Offline actions synced successfully.');
        
        set({ offlineQueue: [] });
        return offlineQueue.length;
      },
      clearQueue: () => set({ offlineQueue: [] }),
    }),
    {
      name: 'offline-queue-storage',
    }
  )
);
