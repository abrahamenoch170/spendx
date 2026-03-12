'use client';
import React from 'react';
import { Bell, MapPin, Flame, Zap, Plus, Users, Briefcase, User } from 'lucide-react';
import { useTab } from '../../context/TabContext';

export const DashboardTab = () => {
  const { setActiveTab } = useTab();

  const modes = [
    { name: 'Solo', icon: User },
    { name: 'Squad', icon: Users },
    { name: 'Enterprise', icon: Briefcase },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)] pb-20">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Spendx</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            London
          </div>
          <div className="relative">
            <Bell className="w-6 h-6" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Greeting & Streak */}
        <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--border-color)]">
          <h2 className="text-lg font-bold">Good morning, Abraham</h2>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-[var(--lime)]">
              <Flame className="w-6 h-6 fill-current" />
              <span className="font-bold text-xl">12</span>
            </div>
            <div className="text-sm text-[var(--text-secondary)]">1,240 points this month</div>
          </div>
        </div>

        {/* AI Tokens Bar */}
        <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--border-color)]">
          <div className="flex justify-between text-sm mb-2">
            <span>12 tokens remaining this month</span>
            <Zap className="w-4 h-4 text-[var(--cyan)]" />
          </div>
          <div className="w-full h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
            <div className="w-[60%] h-full bg-[var(--cyan)]" />
          </div>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-3">
          {modes.map(mode => (
            <button key={mode.name} onClick={() => setActiveTab('plan')} className="bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--border-color)] flex flex-col items-center gap-2">
              <mode.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{mode.name}</span>
            </button>
          ))}
        </div>

        {/* Leaderboard (Mini) */}
        <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--border-color)]">
          <h3 className="font-bold mb-3">Monthly Leaderboard</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map(rank => (
              <div key={rank} className="flex flex-col items-center gap-1 min-w-[60px]">
                <div className="w-10 h-10 rounded-full bg-[var(--border-color)]" />
                <span className="text-xs font-bold">User{rank}</span>
                <span className="text-[10px] text-[var(--text-secondary)]">#{rank}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-3">Your rank: #42 of 1,203</p>
        </div>

        {/* Trending */}
        <div className="space-y-3">
          <h3 className="font-bold">Trending Venues</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[150px] bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] p-3">
                <div className="w-full h-24 bg-[var(--border-color)] rounded-xl mb-2" />
                <p className="font-bold">Venue {i}</p>
                <div className="inline-block px-2 py-0.5 rounded-full bg-[var(--cyan)]/20 text-[var(--cyan)] text-xs mt-1">Vibe: 9.5</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Plan FAB */}
      <button onClick={() => setActiveTab('plan')} className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-[var(--lime)] flex items-center justify-center shadow-lg z-40">
        <Plus className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};
