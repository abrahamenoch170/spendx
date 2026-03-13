import React from 'react';
import { motion } from 'framer-motion';
import { useHomeStore } from '../../store/homeStore';

export const MiniLeaderboard = () => {
  const { leaderboard, userProfile } = useHomeStore();

  return (
    <div className="px-6">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white/5 p-4 rounded-3xl border border-white/10"
      >
        <div className="flex gap-4 mb-4">
          {leaderboard.map(user => (
            <div key={user.id} className="flex flex-col items-center gap-1">
              <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.avatarSeed}`} alt={user.username} className="w-12 h-12 rounded-full bg-white/10" />
              <span className="text-xs font-bold">#{user.rank}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-white/60">Your rank: <span className="text-[#D4FF00] font-bold">#{userProfile.rank}</span> of {userProfile.totalUsers}</p>
      </motion.div>
    </div>
  );
};
