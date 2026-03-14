import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Trophy, Users, Target, Zap } from 'lucide-react';

const CATEGORIES = [
  { id: 'overall', name: 'Overall', icon: Trophy },
  { id: 'solo', name: 'Solo', icon: Target },
  { id: 'squad', name: 'Squad', icon: Users },
  { id: 'budget', name: 'Budget Masters', icon: Zap },
  { id: 'venue', name: 'Venue Discoverers', icon: Target },
];

const MOCK_USERS = Array.from({ length: 100 }, (_, i) => ({
  id: `u${i}`,
  username: `User${i + 1}`,
  points: Math.floor(Math.random() * 10000),
  avatar: `https://api.dicebear.com/9.x/bottts/svg?seed=${i}`,
}));

export const Leaderboard = ({ onClose }: { onClose: () => void }) => {
  const [activeCategory, setActiveCategory] = useState('overall');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 bg-[#050505] z-[5000] flex flex-col"
    >
      <div className="p-6 flex items-center gap-4 border-b border-white/10">
        <button onClick={onClose}><ChevronLeft /></button>
        <h1 className="text-xl font-bold">Leaderboard</h1>
      </div>

      <div className="flex gap-2 p-4 overflow-x-auto">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeCategory === cat.id ? 'bg-[#CCFF00] text-black' : 'bg-white/5'}`}
          >
            <cat.icon size={16} />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {MOCK_USERS.sort((a, b) => b.points - a.points).map((user, index) => (
          <div 
            key={user.id} 
            onClick={() => setSelectedUser(user)}
            className="flex items-center gap-4 p-4 border-b border-white/5 cursor-pointer"
          >
            <span className="text-white/50 w-8">{index + 1}</span>
            <img src={user.avatar} className="w-10 h-10 rounded-full" alt={user.username} />
            <span className="flex-1 font-bold">{user.username}</span>
            <span className="text-[#CCFF00] font-mono">{user.points} pts</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-0 bg-[#050505] z-[6000] p-6"
          >
            <button onClick={() => setSelectedUser(null)} className="mb-6"><ChevronLeft /></button>
            <div className="flex flex-col items-center">
              <img src={selectedUser.avatar} className="w-32 h-32 rounded-full mb-6" alt={selectedUser.username} />
              <h2 className="text-3xl font-bold mb-2">{selectedUser.username}</h2>
              <p className="text-[#CCFF00] font-mono mb-8">{selectedUser.points} points</p>
              <div className="w-full bg-white/5 p-6 rounded-3xl">
                <h3 className="font-bold mb-4">Badges</h3>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10" />
                  <div className="w-12 h-12 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
