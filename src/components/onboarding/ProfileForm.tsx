import React, { useState } from 'react';
import { useOnboardingStore } from '../../store/onboardingStore';

const CITIES = ["London", "New York City", "Lagos", "Toronto", "Berlin", "Paris", "Dubai", "Tokyo", "Singapore", "Barcelona", "Los Angeles", "Cape Town", "Amsterdam", "Sydney", "Mumbai", "Mexico City", "Istanbul", "Seoul", "Bangkok", "Johannesburg"];

export const ProfileForm = ({ onNext }: { onNext: () => void }) => {
  const { profile, setProfile } = useOnboardingStore();
  const [usernameStatus, setUsernameStatus] = useState<'available' | 'taken' | null>(null);

  const checkUsername = (username: string) => {
    const reserved = ['admin', 'spendx', 'root'];
    if (reserved.includes(username.toLowerCase())) {
      setUsernameStatus('taken');
    } else if (username.length > 0) {
      setUsernameStatus('available');
    } else {
      setUsernameStatus(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black uppercase tracking-tighter">Your Identity</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl"
        onChange={(e) => {
          setProfile({ username: e.target.value });
          checkUsername(e.target.value);
        }}
      />
      {usernameStatus && (
        <p className={`text-xs ${usernameStatus === 'available' ? 'text-spendx-lime' : 'text-spendx-magenta'}`}>
          Username {usernameStatus}
        </p>
      )}
      <select
        className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl"
        onChange={(e) => setProfile({ country: e.target.value })}
      >
        <option value="">Select City</option>
        {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
      </select>
      <button onClick={onNext} className="w-full py-4 bg-spendx-lime text-spendx-black rounded-2xl font-black text-xl uppercase">Next</button>
    </div>
  );
};
