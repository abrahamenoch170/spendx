'use client';
import React, { useState, useEffect } from 'react';
import { 
  Bell, MapPin, Flame, Zap, Plus, Users, Briefcase, User, 
  MessageSquare, Search, TrendingUp, Star, ArrowUpRight 
} from 'lucide-react';
import { useTab } from '../../context/TabContext';
import { motion } from 'framer-motion';

const springEasing = [0.34, 1.56, 0.64, 1];

export const DashboardTab = () => {
  const { setActiveTab, setIsEnterprise, isStudent } = useTab();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('spendx_user_data');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const modes = [
    { name: 'Solo', icon: User, action: () => setActiveTab('plan'), color: 'var(--cyan)' },
    { name: 'Squad', icon: Users, action: () => setActiveTab('plan'), color: 'var(--lime)' },
    { name: 'Enterprise', icon: Briefcase, action: () => { setIsEnterprise(true); setActiveTab('enterprise'); }, color: 'var(--magenta)' },
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white selection:bg-[var(--lime)] selection:text-black pb-24 overflow-hidden relative">
      <div className="grain-overlay opacity-20" />
      
      {/* Top Bar */}
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--lime)] rounded-full flex items-center justify-center text-black font-black text-xl">
            S*
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">SPENDX</h1>
            <div className="flex items-center gap-1 text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
              <MapPin className="w-2 h-2" /> {userData?.city || 'London'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-white/60" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--magenta)] shadow-[0_0_10px_var(--magenta)]" />
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-[var(--lime)] overflow-hidden bg-white/10">
            <img 
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${userData?.avatarSeed || 'default'}`} 
              alt="avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10">
        {/* Greeting & Quick Stats */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Welcome back</p>
              <h2 className="text-4xl font-black tracking-tighter">{userData?.firstName || 'Abraham'}</h2>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Flame className="w-5 h-5 text-[var(--lime)] fill-current" />
              <span className="font-black text-xl">12</span>
            </div>
          </div>
          
          {isStudent && (
            <div className="bg-[var(--magenta)]/10 border border-[var(--magenta)]/30 p-3 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--magenta)] rounded-lg flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-xs font-black text-[var(--magenta)] uppercase tracking-widest">Broke Mode Active</p>
                <p className="text-[10px] text-white/60">Student discount applied to all venues</p>
              </div>
            </div>
          )}
        </section>

        {/* AI Command Center */}
        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--lime)] via-[var(--cyan)] to-[var(--magenta)] rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
          <div className="relative bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4 backdrop-blur-xl">
            <Search className="w-6 h-6 text-white/30" />
            <input 
              type="text" 
              placeholder="Where we going tonight?" 
              className="flex-1 bg-transparent outline-none text-lg font-bold placeholder:text-white/20"
            />
            <button className="p-3 bg-[var(--lime)] rounded-xl text-black hover:scale-105 transition-transform active:scale-95">
              <Zap className="w-5 h-5 fill-current" />
            </button>
          </div>
        </section>

        {/* Mode Grid */}
        <section className="grid grid-cols-3 gap-4">
          {modes.map(mode => (
            <motion.button 
              key={mode.name} 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={mode.action} 
              className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col items-center gap-3 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-black border border-white/5 group-hover:border-white/20 transition-colors" style={{ color: mode.color }}>
                <mode.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{mode.name}</span>
            </motion.button>
          ))}
        </section>

        {/* Trending Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--lime)]" /> TRENDING NOW
            </h3>
            <button className="text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors">See All</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {[
              { name: 'The Alchemist', vibe: '9.8', color: 'var(--magenta)', img: 'https://picsum.photos/seed/bar/400/300' },
              { name: 'Fabric London', vibe: '9.5', color: 'var(--cyan)', img: 'https://picsum.photos/seed/club/400/300' },
              { name: 'Sketch', vibe: '9.2', color: 'var(--lime)', img: 'https://picsum.photos/seed/lounge/400/300' },
            ].map((venue, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8 }}
                className="min-w-[240px] bg-white/5 rounded-[32px] border border-white/10 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1">
                      <Star className="w-3 h-3 text-[var(--lime)] fill-current" />
                      <span className="text-[10px] font-black">{venue.vibe}</span>
                    </div>
                    <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-black text-lg tracking-tight mb-1">{venue.name}</h4>
                  <div className="flex gap-2">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Cocktails</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40">•</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Mayfair</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Squad Activity */}
        <section className="bg-white/5 rounded-[32px] border border-white/10 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-black tracking-tight">SQUAD ACTIVITY</h3>
            <Users className="w-5 h-5 text-[var(--cyan)]" />
          </div>
          <div className="space-y-4">
            {[
              { user: 'Sam', action: 'is at The Alchemist', time: '2m ago' },
              { user: 'Jordan', action: 'locked in a squad plan', time: '15m ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10" />
                <div className="flex-1">
                  <p className="text-sm font-bold">
                    <span className="text-[var(--lime)]">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActiveTab('plan')} 
        className="fixed bottom-28 right-6 w-16 h-16 rounded-2xl bg-[var(--lime)] flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.4)] z-50 text-black"
      >
        <Plus className="w-10 h-10" />
      </motion.button>
    </div>
  );
};
