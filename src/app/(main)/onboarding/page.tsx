'use client';
import React, { useState, useEffect } from 'react';
import { client as supabase } from '../../../lib/db/client';
// import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    username: '',
    city: '',
    avatarSeed: ''
  });
  const [avatars, setAvatars] = useState<string[]>([]);
  // const router = useRouter();

  const cities = [
    'London', 'Manchester', 'Edinburgh', 'Bristol', 'NYC', 'LA', 'Austin', 'Chicago', 'Miami', 
    'Toronto', 'Vancouver', 'Sydney', 'Melbourne', 'Lagos', 'Nairobi', 'Cape Town', 'Dubai', 
    'Tokyo', 'Singapore', 'Berlin', 'Other'
  ];

  useEffect(() => {
    generateAvatars();
  }, []);

  const generateAvatars = () => {
    const newAvatars = Array.from({ length: 12 }, () => Math.random().toString(36).substring(7));
    setAvatars(newAvatars);
  };

  const saveProfile = async () => {
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return;

    // await supabase.from('users').insert({
    //   id: user.id,
    //   email: user.email,
    //   ...formData
    // });
    // router.push('/onboarding/modes');
    console.log('Saved profile:', formData);
  };

  return (
    <div className="min-h-screen p-6 bg-[var(--bg-color)] text-[var(--text-primary)]">
      {step === 1 && (
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Basic Info</h1>
          <input 
            placeholder="First Name" 
            className="w-full p-3 mb-4 bg-[var(--card-bg)] rounded-xl"
            onChange={e => setFormData({...formData, firstName: e.target.value})}
          />
          <input 
            placeholder="Username" 
            className="w-full p-3 mb-4 bg-[var(--card-bg)] rounded-xl"
            onChange={e => setFormData({...formData, username: e.target.value})}
          />
          <select 
            className="w-full p-3 mb-4 bg-[var(--card-bg)] rounded-xl"
            onChange={e => setFormData({...formData, city: e.target.value})}
          >
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          <button onClick={() => setStep(2)} className="w-full p-3 bg-[var(--lime)] text-black rounded-xl">Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Choose Avatar</h1>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {avatars.map(seed => (
              <button key={seed} onClick={() => setFormData({...formData, avatarSeed: seed})} className="relative">
                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`} alt="avatar" />
                <div className="absolute inset-0 border-2 border-[var(--magenta)] opacity-20 pointer-events-none">★</div>
              </button>
            ))}
          </div>
          <button onClick={generateAvatars} className="w-full p-3 mb-4 bg-[var(--card-bg)] rounded-xl">Regenerate</button>
          <button onClick={saveProfile} className="w-full p-3 bg-[var(--lime)] text-black rounded-xl">Finish</button>
        </div>
      )}
    </div>
  );
}
