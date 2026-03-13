import { create } from 'zustand';

interface OnboardingState {
  profile: {
    firstName: string;
    username: string;
    country: string;
    avatarSeed: string;
    showOnMap: boolean;
  };
  mode: string | null;
  setProfile: (profile: Partial<OnboardingState['profile']>) => void;
  setMode: (mode: string) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  profile: {
    firstName: '',
    username: '',
    country: '',
    avatarSeed: 'default',
    showOnMap: true,
  },
  mode: null,
  setProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  setMode: (mode) => set({ mode }),
}));
