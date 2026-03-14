'use client';
import React, { useState, useEffect } from 'react';
import { FilterStudio } from '../FilterStudio';
import { 
  Bell, MapPin, Flame, Zap, Plus, Users, Briefcase, User, 
  MessageSquare, Search, TrendingUp, Star, ArrowUpRight, ChevronRight, Map, Camera
} from 'lucide-react';
import { useTab } from '../../context/TabContext';
import { motion, AnimatePresence, Variants, useScroll } from 'framer-motion';
import Lottie from 'lottie-react';
import { CountdownWidget } from './CountdownWidget';
import { AnimatedInput } from '../ui/AnimatedInput';
import { ParallaxImage } from '../ui/ParallaxImage';

const springEasing: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const DashboardTab = () => {
  const { setActiveTab, setIsEnterprise, isStudent } = useTab();
  const [userData, setUserData] = useState<any>(null);
  const [showFilterStudio, setShowFilterStudio] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem('spendx_user_data');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const modes = [
    { name: 'Map', icon: Map, action: () => setActiveTab('map'), color: 'var(--lime)' },
    { name: 'Solo', icon: User, action: () => setActiveTab('plan'), color: 'var(--cyan)' },
    { name: 'Squad', icon: Users, action: () => setActiveTab('plan'), color: 'var(--magenta)' },
    { name: 'Enterprise', icon: Briefcase, action: () => { setIsEnterprise(true); setActiveTab('enterprise'); }, color: 'white' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white selection:bg-[var(--lime)] selection:text-black pb-24 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,255,0,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(0,255,255,0.05),transparent_40%)] pointer-events-none" />
      <div className="grain-overlay opacity-30 mix-blend-overlay pointer-events-none" />
      
      {/* Top Bar */}
      <header className="relative z-20 flex justify-between items-center p-6 bg-black/40 backdrop-blur-2xl border-b border-white/5 sticky top-0">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-gradient-to-br from-[var(--lime)] to-[#99cc00] rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-[0_0_20px_rgba(204,255,0,0.2)]"
          >
            S*
          </motion.div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">SPENDX</h1>
            <div className="flex items-center gap-1 text-[11px] font-bold text-white/50 uppercase tracking-widest mt-1">
              <MapPin className="w-3 h-3" /> {userData?.city || 'London'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 backdrop-blur-md"
          >
            <Bell className="w-5 h-5 text-white/80" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[var(--magenta)] shadow-[0_0_12px_var(--magenta)] border-2 border-black" />
          </motion.button>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('profile')}
            className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[var(--lime)] to-[var(--cyan)] cursor-pointer shadow-lg"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img 
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${userData?.avatarSeed || 'default'}`} 
                alt="avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto p-6 space-y-10 relative z-10 no-scrollbar"
      >
        {/* Greeting & Quick Stats */}
        <motion.section variants={itemVariants} className="space-y-5">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/50 font-bold uppercase tracking-[0.25em] text-[11px] mb-2">Welcome back</p>
              <h2 className="text-5xl font-black tracking-tighter">{userData?.firstName || 'Abraham'}</h2>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/5 px-5 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl"
            >
              <Flame className="w-6 h-6 text-[var(--lime)] fill-current drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]" />
              <span className="font-black text-2xl">12</span>
            </motion.div>
          </div>
          
          {isStudent && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[var(--magenta)]/20 to-[var(--magenta)]/5 border border-[var(--magenta)]/30 p-4 rounded-3xl flex items-center gap-4 backdrop-blur-md"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--magenta)] to-[#cc00cc] rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,0,255,0.3)]">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-sm font-black text-[var(--magenta)] uppercase tracking-widest drop-shadow-sm">Broke Mode Active</p>
                <p className="text-xs text-white/70 font-medium mt-0.5">Student discount applied to all venues</p>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Next Outing Countdown */}
        <motion.section variants={itemVariants}>
          <CountdownWidget />
        </motion.section>

        {/* AI Command Center */}
        <motion.section variants={itemVariants} className="relative group">
          <AnimatedInput 
            label="Search" 
            placeholder="Where we going tonight?" 
            className="w-full bg-transparent py-4 outline-none text-xl font-bold placeholder:text-white/30 text-white"
          />
        </motion.section>

        {/* Mode Grid */}
        <motion.section variants={itemVariants} className="grid grid-cols-4 gap-4">
          {modes.map(mode => (
            <motion.button 
              key={mode.name} 
              whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={mode.action} 
              className="bg-white/5 p-4 rounded-[1.5rem] border border-white/10 flex flex-col items-center gap-3 transition-all group backdrop-blur-md shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-black border border-white/10 group-hover:border-white/30 transition-colors shadow-inner" style={{ color: mode.color }}>
                <mode.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors truncate w-full text-center">{mode.name}</span>
            </motion.button>
          ))}
          <motion.button 
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilterStudio(true)} 
            className="bg-white/5 p-4 rounded-[1.5rem] border border-white/10 flex flex-col items-center gap-3 transition-all group backdrop-blur-md shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-black border border-white/10 group-hover:border-white/30 transition-colors shadow-inner text-[var(--magenta)]">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors truncate w-full text-center">Filters</span>
          </motion.button>
        </motion.section>

        {/* Trending Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[var(--lime)]" /> TRENDING NOW
            </h3>
            <button className="flex items-center gap-1 text-xs font-black text-white/50 uppercase tracking-widest hover:text-white transition-colors group">
              See All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div ref={scrollContainerRef} className="flex gap-5 overflow-x-auto pb-6 no-scrollbar -mx-6 px-6 snap-x">
            {[
              { name: 'The Alchemist', vibe: '9.8', color: 'var(--magenta)', img: 'https://picsum.photos/seed/bar/400/300', tags: ['Cocktails', 'Mayfair'] },
              { name: 'Fabric London', vibe: '9.5', color: 'var(--cyan)', img: 'https://picsum.photos/seed/club/400/300', tags: ['Club', 'Farringdon'] },
              { name: 'Sketch', vibe: '9.2', color: 'var(--lime)', img: 'https://picsum.photos/seed/lounge/400/300', tags: ['Lounge', 'Soho'] },
            ].map((venue, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8, scale: 1.02 }}
                className="min-w-[280px] snap-center bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden group cursor-pointer backdrop-blur-md shadow-xl"
              >
                <ParallaxImage src={venue.img} alt={venue.name} containerRef={scrollContainerRef} />
                <div className="p-6">
                  <h4 className="font-black text-xl tracking-tight mb-2">{venue.name}</h4>
                  <div className="flex gap-2">
                    {venue.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{tag}</span>
                        {idx < venue.tags.length - 1 && <span className="text-[10px] font-black uppercase tracking-widest text-white/30">•</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Squad Activity */}
        <motion.section variants={itemVariants} className="bg-gradient-to-br from-white/10 to-white/5 rounded-[2.5rem] border border-white/10 p-7 space-y-6 backdrop-blur-xl shadow-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <Users className="w-6 h-6 text-[var(--cyan)]" /> SQUAD ACTIVITY
            </h3>
            <button 
              onClick={() => setActiveTab('squad')}
              className="flex items-center gap-1 text-xs font-black text-white/50 uppercase tracking-widest hover:text-white transition-colors group"
            >
              See All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-5">
            {[
              { user: 'Sam', action: 'is at The Alchemist', time: '2m ago', seed: 'sam' },
              { user: 'Jordan', action: 'locked in a squad plan', time: '15m ago', seed: 'jordan' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-black border-2 border-white/10 overflow-hidden group-hover:border-[var(--cyan)] transition-colors">
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${activity.seed}`} alt={activity.user} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-white/90">
                    <span className="text-[var(--lime)]">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed bottom-28 right-6 z-50 flex flex-col gap-4"
      >
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('chat')}
          className="w-14 h-14 bg-white/10 backdrop-blur-xl text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20 ml-auto"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('plan')} 
          className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-[var(--lime)] to-[#99cc00] flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.4)] text-black border border-white/20"
        >
          <Plus className="w-8 h-8" />
        </motion.button>
        {showFilterStudio && <FilterStudio onClose={() => setShowFilterStudio(false)} />}
      </motion.div>
    </div>
  );
};
