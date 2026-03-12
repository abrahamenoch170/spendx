'use client';
import React, { createContext, useContext, useState } from 'react';

export type Tab = 'home' | 'plan' | 'squad' | 'map' | 'profile' | 'enterprise';

export const TabContext = createContext<{ 
  activeTab: Tab; 
  setActiveTab: (tab: Tab) => void;
  isEnterprise: boolean;
  setIsEnterprise: (val: boolean) => void;
} | undefined>(undefined);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isEnterprise, setIsEnterprise] = useState(false);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, isEnterprise, setIsEnterprise }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTab must be used within a TabProvider');
  return context;
};
