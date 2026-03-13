import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '../../store/onboardingStore';

export const AvatarSelector = ({ onNext }: { onNext: () => void }) => {
  const [seeds, setSeeds] = useState(Array.from({ length: 12 }, () => Math.random().toString(36).substring(7)));
  const [selected, setSelected] = useState<string | null>(null);
  const { profile, setProfile } = useOnboardingStore();

  const refreshAvatars = () => {
    setSeeds(Array.from({ length: 12 }, () => Math.random().toString(36).substring(7)));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black uppercase tracking-tighter">Choose Your Vibe</h2>
      <div className="grid grid-cols-4 gap-4">
        {seeds.map((seed) => (
          <motion.button
            key={seed}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelected(seed);
              setProfile({ avatarSeed: seed });
            }}
            className={`rounded-full p-1 border-4 ${selected === seed ? 'border-spendx-lime' : 'border-transparent'}`}
          >
            <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`} alt="avatar" className="w-full h-full rounded-full bg-white/10" />
          </motion.button>
        ))}
      </div>
      <button onClick={refreshAvatars} className="text-spendx-cyan text-sm uppercase tracking-widest">
        Uhm... Don't like this? Move to the next
      </button>
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
        <span>Show my avatar on map</span>
        <input type="checkbox" checked={profile.showOnMap} onChange={(e) => setProfile({ showOnMap: e.target.checked })} />
      </div>
      <button onClick={onNext} className="w-full py-4 bg-spendx-lime text-spendx-black rounded-2xl font-black text-xl uppercase">Next</button>
    </div>
  );
};
