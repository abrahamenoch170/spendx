'use client';
import { createContext, useContext } from 'react';

export type Tab = 'home' | 'plan' | 'squad' | 'map' | 'profile';

export const TabContext = createContext<{ activeTab: Tab; setActiveTab: (tab: Tab) => void } | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTab must be used within a TabProvider');
  return context;
};
