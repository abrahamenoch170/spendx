import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileStore } from '../../store/profileStore';
import { useMapStore } from '../../store/mapStore';
import { Settings, Copy, Share2, Trash2 } from 'lucide-react';

export const ProfileTab = () => {
  const { userProfile, achievements, shareLinks, pastTrips } = useProfileStore();
  const { activeMode } = useMapStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="h-full w-full bg-[#050505] text-white p-6 overflow-y-auto">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-8">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32 rounded-full border-4 border-[#D4FF00] p-1 mb-4"
        >
          <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${userProfile.username}`} alt="Avatar" className="w-full h-full rounded-full" />
          <div className="absolute -top-2 -right-2 bg-[#D4FF00] text-black font-bold px-2 py-1 rounded-full text-xs uppercase">
            {userProfile.tier}
          </div>
        </motion.div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">{userProfile.username}</h1>
        <p className="text-white/50">{userProfile.city} • Member since {userProfile.memberSince}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {[
          { label: 'Spendxs', value: userProfile.stats.spendxsCompleted },
          { label: 'Saved', value: `₦${userProfile.stats.totalSaved / 1000}k` },
          { label: 'Cities', value: userProfile.stats.citiesExplored },
          { label: 'Squad', value: userProfile.stats.squadSize },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 p-3 rounded-xl text-center border border-white/5">
            <p className="text-xs text-white/50">{stat.label}</p>
            <p className="font-bold text-lg">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Mode Toggle */}
      <div className="flex bg-white/5 p-1 rounded-full mb-8">
        {['group', 'solo', 'stealth'].map(mode => (
          <button 
            key={mode}
            className={`flex-1 py-2 rounded-full font-bold uppercase text-xs ${activeMode === mode ? 'bg-[#D4FF00] text-black' : 'text-white/50'}`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Achievement Gallery */}
      <h3 className="font-bold mb-4">Achievements</h3>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {achievements.map(a => (
          <div key={a.id} className={`p-4 rounded-xl border ${a.unlocked ? 'border-[#D4FF00]' : 'border-white/10'}`}>
            <div className="w-8 h-8 bg-white/10 rounded-full mb-2" />
            <p className="text-[10px] truncate">{a.title}</p>
          </div>
        ))}
      </div>

      {/* Generated Links Gallery */}
      <h3 className="font-bold mb-4">Share Links</h3>
      <div className="space-y-2 mb-8">
        {shareLinks.map(link => (
          <div key={link.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
            <p className="text-sm">{link.title}</p>
            <div className="flex gap-2">
              <Copy size={16} />
              <Share2 size={16} />
              <Trash2 size={16} className="text-red-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Outing Memory Gallery */}
      <h3 className="font-bold mb-4">Past Trips</h3>
      <div className="grid grid-cols-2 gap-4">
        {pastTrips.map(trip => (
          <div key={trip.id} className="bg-white/5 rounded-xl overflow-hidden">
            <img src={trip.thumbnail} alt="Trip" className="w-full h-24 object-cover" />
            <div className="p-2">
              <p className="text-xs font-bold">{trip.location}</p>
              <p className="text-[10px] text-white/50">{trip.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Button */}
      <button onClick={() => setShowSettings(true)} className="fixed bottom-24 right-6 bg-[#D4FF00] p-4 rounded-full text-black">
        <Settings size={24} />
      </button>

      {/* Settings Modal (Simplified) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[3000] p-6 flex items-center justify-center"
            onClick={() => setShowSettings(false)}
          >
            <div className="bg-[#050505] border border-white/10 p-6 rounded-3xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <p className="text-white/50 mb-4">Student Mode, Notifications, Profile Customization</p>
              <button onClick={() => setShowSettings(false)} className="w-full bg-white/10 py-3 rounded-full">Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
