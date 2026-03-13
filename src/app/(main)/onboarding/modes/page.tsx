'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const modes = [
  { id: 'solo', title: 'Just me', subtitle: 'Let\'s go', color: 'bg-[var(--lime)]', icon: '👤' },
  { id: 'squad', title: 'With friends', subtitle: 'Create room', color: 'bg-[var(--magenta)]', icon: '👥' },
  { id: 'enterprise', title: 'Running an event', subtitle: 'Admin view', color: 'bg-[var(--teal)]', icon: '📢' },
];

export default function ModesPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [step, setStep] = useState(0); // 0: modes, 1: permissions
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('spendx_has_account') === 'true') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleModeSelect = (id: string) => {
    setSelectedMode(id);
    console.log('Mode selected:', id);
    setStep(1);
  };

  const requestPermissions = async () => {
    // Location
    try {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    } catch (e) {
      console.log('Location denied');
    }

    // Notifications
    try {
      await Notification.requestPermission();
    } catch (e) {
      console.log('Notifications denied');
    }

    localStorage.setItem('spendx_has_account', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen p-6 bg-[var(--bg-color)] text-[var(--text-primary)]">
      {step === 0 ? (
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Choose your mode</h1>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {modes.map(mode => (
              <motion.div 
                key={mode.id}
                whileTap={{ scale: 0.95 }}
                className={`min-w-[200px] p-6 rounded-3xl ${mode.color} text-black cursor-pointer`}
                onClick={() => handleModeSelect(mode.id)}
              >
                <div className="text-4xl mb-4">{mode.icon}</div>
                <h2 className="text-xl font-bold">{mode.title}</h2>
                <p className="text-sm">{mode.subtitle}</p>
              </motion.div>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="w-full mt-6 p-3 bg-[var(--card-bg)] rounded-xl">Skip</button>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Permissions</h1>
          <p className="mb-6">We need your permission to provide the best experience.</p>
          <button onClick={requestPermissions} className="w-full p-4 bg-[var(--lime)] text-black font-bold rounded-xl">Let's go →</button>
        </div>
      )}
    </div>
  );
}
