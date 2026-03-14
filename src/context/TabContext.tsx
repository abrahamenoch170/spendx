import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isEnterprise: boolean;
  setIsEnterprise: (isEnterprise: boolean) => void;
  isStudent: boolean;
  setIsStudent: (isStudent: boolean) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isEnterprise,
        setIsEnterprise,
        isStudent,
        setIsStudent,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}
