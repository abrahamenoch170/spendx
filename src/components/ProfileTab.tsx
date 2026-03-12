'use client';
import React from 'react';
import { User, Settings, Shield, Bell, CreditCard, LogOut, ChevronRight } from 'lucide-react';

export const ProfileTab = () => {
  const sections = [
    { title: 'Account Settings', icon: User },
    { title: 'Privacy & Safety', icon: Shield },
    { title: 'Notifications', icon: Bell },
    { title: 'Subscription', icon: CreditCard },
    { title: 'App Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)] overflow-y-auto pb-32">
      {/* Profile Header */}
      <div className="p-8 flex flex-col items-center text-center bg-gradient-to-b from-[var(--lime)]/10 to-transparent">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-[var(--lime)] p-1">
            <img 
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Abraham" 
              alt="Profile" 
              className="w-full h-full rounded-full bg-white object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--lime)] rounded-full border-4 border-[var(--bg-color)] flex items-center justify-center text-black font-bold text-xs">
            12
          </div>
        </div>
        <h2 className="text-2xl font-black tracking-tighter">Abraham Enoch</h2>
        <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">@abraham_spendx • London</p>
      </div>

      {/* Stats */}
      <div className="px-6 grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-white/5 text-center">
          <div className="text-xl font-black text-[var(--lime)]">12</div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Streak</div>
        </div>
        <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-white/5 text-center">
          <div className="text-xl font-black text-[var(--magenta)]">1.2k</div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Points</div>
        </div>
        <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-white/5 text-center">
          <div className="text-xl font-black text-[var(--cyan)]">42</div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Spendxes</div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-6 space-y-3">
        {sections.map((section) => (
          <button key={section.title} className="w-full bg-[var(--card-bg)] p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-[var(--lime)]/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-[var(--lime)] transition-colors">
                <section.icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">{section.title}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20" />
          </button>
        ))}
        
        <button className="w-full bg-red-500/10 p-4 rounded-2xl border border-red-500/20 flex items-center gap-4 text-red-500 mt-8">
          <LogOut className="w-5 h-5" />
          <span className="font-bold text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );
};
