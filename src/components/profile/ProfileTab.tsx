import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useProfileStore } from '../../store/profileStore';
import { useMapStore } from '../../store/mapStore';
import { Settings, Copy, Share2, Trash2, MapPin, Star, Flame, Calendar, ChevronRight, Edit3, ArrowLeft } from 'lucide-react';
import { useTab } from '../../context/TabContext';

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

export const ProfileTab = () => {
  const { setActiveTab } = useTab();
  const { userProfile, achievements, shareLinks, pastTrips } = useProfileStore();
  const { activeMode } = useMapStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white pb-24 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(204,255,0,0.05),transparent_50%),radial-gradient(circle_at_bottom_center,rgba(0,255,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="grain-overlay opacity-30 mix-blend-overlay pointer-events-none" />

      <header className="relative z-20 p-6 bg-black/40 backdrop-blur-2xl border-b border-white/5 sticky top-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab('home')}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">PROFILE</h1>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10 no-scrollbar"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-[var(--lime)] via-[var(--cyan)] to-[var(--magenta)] shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-black border-4 border-black">
                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${userProfile.username}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-[var(--lime)] text-black font-black px-3 py-1 rounded-full text-[10px] uppercase shadow-lg border-2 border-black">
              {userProfile.tier}
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl border-2 border-black"
            >
              <Edit3 className="w-5 h-5" />
            </motion.button>
          </div>
          
          <div>
            <h2 className="text-3xl font-black tracking-tight">{userProfile.username}</h2>
            <p className="text-sm font-bold text-white/50 flex items-center justify-center gap-1 mt-1">
              <MapPin className="w-4 h-4" /> {userProfile.city} • Member since {userProfile.memberSince}
            </p>
          </div>
        </motion.section>

        {/* Stats Row */}
        <motion.section variants={itemVariants} className="grid grid-cols-4 gap-3">
          {[
            { label: 'Spendxs', value: userProfile.stats.spendxsCompleted, color: 'var(--lime)' },
            { label: 'Saved', value: `₦${userProfile.stats.totalSaved / 1000}k`, color: 'var(--cyan)' },
            { label: 'Cities', value: userProfile.stats.citiesExplored, color: 'var(--magenta)' },
            { label: 'Squad', value: userProfile.stats.squadSize, color: 'white' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 p-4 rounded-2xl text-center border border-white/10 backdrop-blur-md shadow-lg">
              <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="font-black text-xl" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </motion.section>

        {/* Quick Mode Toggle */}
        <motion.section variants={itemVariants} className="flex bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {['group', 'solo', 'stealth'].map(mode => (
            <button 
              key={mode}
              className={`flex-1 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${activeMode === mode ? 'bg-[var(--lime)] text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
            >
              {mode}
            </button>
          ))}
        </motion.section>

        {/* Achievement Gallery */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h3 className="text-sm font-black text-white/40 uppercase tracking-widest px-2">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map(a => (
              <motion.div 
                key={a.id} 
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center backdrop-blur-md shadow-lg ${a.unlocked ? 'border-[var(--lime)] bg-[var(--lime)]/5' : 'border-white/10 bg-white/5'}`}
              >
                <div className={`w-10 h-10 rounded-full mb-3 flex items-center justify-center ${a.unlocked ? 'bg-[var(--lime)] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]' : 'bg-white/10 text-white/30'}`}>
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${a.unlocked ? 'text-white' : 'text-white/40'}`}>{a.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Generated Links Gallery */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h3 className="text-sm font-black text-white/40 uppercase tracking-widest px-2">Share Links</h3>
          <div className="space-y-3">
            {shareLinks.map(link => (
              <motion.div 
                key={link.id} 
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg"
              >
                <p className="text-sm font-bold">{link.title}</p>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Copy size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-[var(--cyan)]/20 text-[var(--cyan)] flex items-center justify-center hover:bg-[var(--cyan)]/30 transition-colors">
                    <Share2 size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500/30 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Outing Memory Gallery */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h3 className="text-sm font-black text-white/40 uppercase tracking-widest px-2">Past Trips</h3>
          <div className="grid grid-cols-2 gap-4">
            {pastTrips.map(trip => (
              <motion.div 
                key={trip.id} 
                whileHover={{ y: -5 }}
                className="bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 backdrop-blur-md shadow-lg group cursor-pointer"
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={trip.thumbnail} alt="Trip" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-black tracking-tight">{trip.location}</p>
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-0.5">{trip.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[3000] p-6 flex items-center justify-center"
            onClick={() => setShowSettings(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 p-8 rounded-[2.5rem] w-full max-w-sm shadow-2xl" 
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-black mb-2">Settings</h2>
              <p className="text-white/50 text-sm mb-8 font-medium">Student Mode, Notifications, Profile Customization</p>
              <button 
                onClick={() => setShowSettings(false)} 
                className="w-full bg-[var(--lime)] text-black font-black py-4 rounded-2xl hover:bg-[#99cc00] transition-colors shadow-[0_0_20px_rgba(204,255,0,0.2)]"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
