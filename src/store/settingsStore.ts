import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  bluetoothProximity: boolean;
  toggleBluetoothProximity: () => void;
}

export const useSettingsStore = create<Settings>()(
  persist(
    (set) => ({
      bluetoothProximity: false,
      toggleBluetoothProximity: () => set((state) => ({ bluetoothProximity: !state.bluetoothProximity })),
    }),
    {
      name: 'settings-storage',
    }
  )
);
