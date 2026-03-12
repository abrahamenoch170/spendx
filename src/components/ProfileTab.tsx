'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Share2, 
  Copy, 
  Trash2, 
  ChevronRight, 
  Lock, 
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Zap,
  Flame,
  Globe,
  Wallet
} from 'lucide-react';

// Mock Data
const USER_DATA = {
  name: 'Abraham Enoch',
  username: '@abraham_spendx',
  city: 'London',
  memberSince: 'March 2024',
  tier: 'Gold', // Green, Gold, Blue, Silver
  stats: {
    completed: 42,
    saved: '£1,240',
    cities: 12,
    squadSize: 8
  }
};

const ACHIEVEMENTS = [
  { id: 1, name: 'Night Owl', desc: 'Complete 10 spendxs after midnight', progress: 8, total: 10, unlocked: false, tattoo: 'star' },
  { id: 2, name: 'City Hopper', desc: 'Visit 5 different cities', progress: 5, total: 5, unlocked: true, tattoo: 'cross' },
  { id: 3, name: 'Squad Leader', desc: 'Lead a squad of 5+ people', progress: 3, total: 5, unlocked: false, tattoo: 'crown' },
  { id: 4, name: 'Early Bird', desc: 'Start a spendx before 10 AM', progress: 10, total: 10, unlocked: true, tattoo: 'sun' },
  { id: 5, name: 'Big Spender', desc: 'Save over £500 in a month', progress: 500, total: 500, unlocked: true, tattoo: 'diamond' },
  { id: 6, name: 'Socialite', desc: 'Connect with 20 new people', progress: 12, total: 20, unlocked: false, tattoo: 'heart' },
  { id: 7, name: 'Explorer', desc: 'Discover 50 new venues', progress: 42, total: 50, unlocked: false, tattoo: 'map' },
  { id: 8, name: 'Loyalist', desc: 'Visit the same venue 5 times', progress: 5, total: 5, unlocked: true, tattoo: 'anchor' },
  { id: 9, name: 'Trendsetter', desc: 'Be the first to visit a new spot', progress: 1, total: 1, unlocked: true, tattoo: 'bolt' },
];

const PLANNED_LINKS = [
  { id: 'lx1', title: 'Friday Night Chaos', date: 'Mar 15', status: 'planned', thumbnail: 'https://picsum.photos/seed/night/200/200' },
  { id: 'lx2', title: 'Sunday Brunch Flow', date: 'Mar 17', status: 'planned', thumbnail: 'https://picsum.photos/seed/brunch/200/200' },
];

const MEMORIES = [
  { id: 'm1', title: 'Soho Saturday', date: 'Feb 24', image: 'https://picsum.photos/seed/soho/400/300' },
  { id: 'm2', title: 'Shoreditch Vibes', date: 'Feb 10', image: 'https://picsum.photos/seed/shoreditch/400/300' },
  { id: 'm3', title: 'Brixton Beats', date: 'Jan 28', image: 'https://picsum.photos/seed/brixton/400/300' },
  { id: 'm4', title: 'Camden Crawl', date: 'Jan 15', image: 'https://picsum.photos/seed/camden/400/300' },
];

const TIER_COLORS = {
  Green: 'border-[var(--lime)] shadow-[0_0_20px_rgba(204,255,0,0.3)]',
  Gold: 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]',
  Blue: 'border-[var(--cyan)] shadow-[0_0_20px_rgba(0,255,255,0.3)]',
  Silver: 'border-slate-300 shadow-[0_0_20px_rgba(203,213,225,0.3)]',
};

const TattooOverlay = ({ type }: { type: string }) => {
  // Simple SVG paths for tattoos
  const tattoos: Record<string, React.ReactNode> = {
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="black" />,
    cross: <path d="M12 2v20M2 12h20" stroke="black" strokeWidth="2" />,
    crown: <path d="M2 20h20l-2-10-4 4-4-8-4 8-4-4-2 10z" fill="black" />,
    sun: <circle cx="12" cy="12" r="5" fill="black" />,
    diamond: <path d="M12 2L2 12l10 10 10-10L12 2z" fill="black" />,
    heart: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="black" />,
    map: <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" fill="black" />,
    anchor: <path d="M12 5V2m0 18c-4.42 0-8-3.58-8-8h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.42-3.58 8-8 8zm0-10a3 3 0 100-6 3 3 0 000 6z" fill="black" />,
    bolt: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="black" />,
  };

  return (
    <svg viewBox="0 0 24 24" className="absolute w-4 h-4 opacity-60 mix-blend-multiply">
      {tattoos[type]}
    </svg>
  );
};

export const ProfileTab = () => {
  const navigate = useNavigate();
  const [selectedAchievement, setSelectedAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null);

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)] overflow-y-auto pb-32">
      {/* Header / Settings Button */}
      <div className="p-4 flex justify-end">
        <button 
          onClick={() => navigate('/settings')}
          className="p-3 bg-[var(--card-bg)] rounded-2xl border border-white/5 hover:bg-white/10 transition-all"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Profile Hero */}
      <div className="px-8 pb-8 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className={`w-[120px] h-[120px] rounded-full border-4 p-1 bg-white relative overflow-hidden ${TIER_COLORS[USER_DATA.tier as keyof typeof TIER_COLORS]}`}>
            <img 
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${USER_DATA.name}`} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
            {/* Tattoo Overlays */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2">
              {ACHIEVEMENTS.filter(a => a.unlocked).slice(0, 3).map((a, i) => (
                <div key={a.id} style={{ transform: `translate(${i * 10}px, ${i * 5}px)` }}>
                  <TattooOverlay type={a.tattoo} />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
            {USER_DATA.tier} Tier
          </div>
        </div>
        
        <h2 className="text-3xl font-black tracking-tighter">{USER_DATA.name}</h2>
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">
          <MapPin className="w-3 h-3" />
          {USER_DATA.city}
          <span className="opacity-20">•</span>
          <Calendar className="w-3 h-3" />
          Since {USER_DATA.memberSince}
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Spendxs', value: USER_DATA.stats.completed, icon: Zap, color: 'text-[var(--lime)]' },
          { label: 'Saved', value: USER_DATA.stats.saved, icon: Wallet, color: 'text-[var(--magenta)]' },
          { label: 'Cities', value: USER_DATA.stats.cities, icon: Globe, color: 'text-[var(--cyan)]' },
          { label: 'Squad', value: USER_DATA.stats.squadSize, icon: Users, color: 'text-[var(--teal)]' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--card-bg)] p-4 rounded-3xl border border-white/5 flex flex-col items-center">
            <stat.icon className={`w-5 h-5 mb-2 ${stat.color}`} />
            <div className="text-xl font-black">{stat.value}</div>
            <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievement Gallery */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Achievements</h3>
          <span className="text-[10px] font-bold text-[var(--lime)]">
            {ACHIEVEMENTS.filter(a => a.unlocked).length}/{ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {ACHIEVEMENTS.map((achievement) => (
            <motion.button
              key={achievement.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAchievement(achievement)}
              className={`aspect-square rounded-3xl border flex flex-col items-center justify-center p-2 relative overflow-hidden transition-all ${
                achievement.unlocked 
                  ? 'bg-white/5 border-[var(--lime)]/30' 
                  : 'bg-black/20 border-white/5 grayscale opacity-50'
              }`}
            >
              <div className="w-8 h-8 mb-1 flex items-center justify-center">
                <TattooOverlay type={achievement.tattoo} />
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-[var(--lime)]" 
                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                />
              </div>
              {!achievement.unlocked && <Lock className="absolute top-2 right-2 w-3 h-3 text-white/20" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Generated Links Gallery */}
      <div className="px-6 mb-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Planned Spendxs</h3>
        <div className="space-y-3">
          {PLANNED_LINKS.map((link) => (
            <div key={link.id} className="bg-[var(--card-bg)] p-3 rounded-3xl border border-white/5 flex items-center gap-4">
              <img src={link.thumbnail} alt="" className="w-12 h-12 rounded-2xl object-cover" />
              <div className="flex-1">
                <h4 className="text-sm font-bold">{link.title}</h4>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{link.date}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/5 rounded-xl transition-colors"><Copy className="w-4 h-4 text-white/60" /></button>
                <button className="p-2 hover:bg-white/5 rounded-xl transition-colors"><Share2 className="w-4 h-4 text-white/60" /></button>
                <button className="p-2 hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4 text-red-500/60" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Gallery */}
      <div className="px-6 mb-12">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Outing Memories</h3>
        <div className="grid grid-cols-2 gap-3">
          {MEMORIES.map((memory) => (
            <motion.div 
              key={memory.id}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img src={memory.image} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                <h4 className="text-xs font-bold">{memory.title}</h4>
                <p className="text-[8px] text-white/60 uppercase font-bold tracking-widest">{memory.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Detail Sheet */}
      <AnimatePresence>
        {selectedAchievement && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 w-full bg-[var(--bg-color)] rounded-t-[40px] border-t border-white/10 z-[1101] p-8 pb-12"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <div className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full border-2 mb-6 flex items-center justify-center ${selectedAchievement.unlocked ? 'border-[var(--lime)] bg-[var(--lime)]/10' : 'border-white/5 bg-white/5'}`}>
                  <div className="scale-150">
                    <TattooOverlay type={selectedAchievement.tattoo} />
                  </div>
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-2">{selectedAchievement.name}</h3>
                <p className="text-white/60 text-sm mb-8">{selectedAchievement.desc}</p>
                
                <div className="w-full space-y-2 mb-8">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{selectedAchievement.progress} / {selectedAchievement.total}</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedAchievement.progress / selectedAchievement.total) * 100}%` }}
                      className="h-full bg-[var(--lime)] rounded-full shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                    />
                  </div>
                </div>

                {selectedAchievement.unlocked ? (
                  <div className="flex items-center gap-2 text-[var(--lime)] font-bold uppercase tracking-widest text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    Achievement Unlocked
                  </div>
                ) : (
                  <button 
                    onClick={() => setSelectedAchievement(null)}
                    className="w-full py-4 bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                  >
                    Keep Grinding
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
