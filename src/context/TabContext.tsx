'use client';
import React, { createContext, useContext, useState } from 'react';

export type Tab = 'home' | 'plan' | 'squad' | 'map' | 'profile';

export const TabContext = createContext<{ activeTab: Tab; setActiveTab: (tab: Tab) => void } | undefined>(undefined);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTab must be used within a TabProvider');
  return context;
};
