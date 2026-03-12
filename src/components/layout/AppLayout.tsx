'use client';
import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fire, Sparkle, UsersThree, MapTrifold, UserCircle } from '@phosphor-icons/react';

type Tab = 'home' | 'plan' | 'squad' | 'map' | 'profile';

const TabContext = createContext<{ activeTab: Tab; setActiveTab: (tab: Tab) => void } | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTab must be used within a TabProvider');
  return context;
};

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: Fire },
  { id: 'plan', label: 'Plan', icon: Sparkle },
  { id: 'squad', label: 'Squad', icon: UsersThree },
  { id: 'map', label: 'Map', icon: MapTrifold },
  { id: 'profile', label: 'Profile', icon: UserCircle },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="min-h-screen flex flex-col bg-[var(--bg-color)]">
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-[var(--card-bg)] border-t border-[var(--border-color)] pb-[env(safe-area-inset-bottom)] z-50">
          <div className="flex justify-around items-center p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-1 p-2"
                >
                  <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-[var(--lime)]' : ''}`}>
                    <Icon size={24} weight={isActive ? 'fill' : 'regular'} />
                  </div>
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </TabContext.Provider>
  );
}
