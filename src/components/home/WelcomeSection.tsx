import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { useHomeStore } from '../../store/homeStore';

export const WelcomeSection = () => {
  const { userProfile } = useHomeStore();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="px-6 space-y-2">
      <h1 className="text-3xl font-black uppercase tracking-tighter">
        {greeting}, {userProfile.username}
      </h1>
      <div className="flex gap-4 text-sm font-medium text-white/60">
        <div className="flex items-center gap-1"><Flame className="text-[#FF007A] w-4 h-4" /> {userProfile.streak} day streak</div>
        <div className="flex items-center gap-1"><Trophy className="text-[#D4FF00] w-4 h-4" /> {userProfile.points} points this month</div>
      </div>
    </div>
  );
};
