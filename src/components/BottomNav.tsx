'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Map as MapIcon, Users, User, Zap, Briefcase, MessageSquare } from 'lucide-react';
import { useTab, Tab } from '../context/TabContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab, isEnterprise } = useTab();

  const navItems: { id: Tab; icon: any; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'plan', icon: Zap, label: 'Plan' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'squad', icon: Users, label: 'Squad' },
    ...(isEnterprise ? [{ id: 'enterprise' as Tab, icon: Briefcase, label: 'Admin' }] : []),
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1001] w-[90%] max-w-md">
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center p-3 transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[var(--lime)]/10 rounded-full"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}
              <item.icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-[var(--lime)]' : 'text-white/40'
                }`}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-widest mt-1 transition-colors ${
                  isActive ? 'text-[var(--lime)]' : 'text-white/40'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
