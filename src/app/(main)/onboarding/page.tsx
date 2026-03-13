'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { InteractiveButton, FloatingInput } from '@/src/components/InteractiveElements';
import { ArrowRight, Check, RefreshCw, MapPin, User, AtSign } from 'lucide-react';

const springEasing = [0.34, 1.56, 0.64, 1];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    username: '',
    city: 'London',
    avatarSeed: ''
  });
  const [avatars, setAvatars] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('spendx_has_account') === 'true') {
      navigate('/app/dashboard', { replace: true });
    }
    generateAvatars();
  }, [navigate]);

  const cities = [
    'London', 'Manchester', 'Edinburgh', 'Bristol', 'NYC', 'LA', 'Austin', 'Chicago', 'Miami', 
    'Toronto', 'Vancouver', 'Sydney', 'Melbourne', 'Lagos', 'Nairobi', 'Cape Town', 'Dubai', 
    'Tokyo', 'Singapore', 'Berlin'
  ];

  const generateAvatars = () => {
    const newAvatars = Array.from({ length: 8 }, () => Math.random().toString(36).substring(7));
    setAvatars(newAvatars);
    if (!formData.avatarSeed) {
      setFormData(prev => ({ ...prev, avatarSeed: newAvatars[0] }));
    }
  };

  const saveProfile = async () => {
    console.log('Saving profile:', formData);
    localStorage.setItem('spendx_user_data', JSON.stringify(formData));
    navigate('/app/modes');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[var(--lime)] selection:text-black overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[var(--magenta)] to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[var(--cyan)] to-transparent" />
      </div>
      <div className="grain-overlay" />

      <div className="relative z-10 max-w-xl mx-auto min-h-screen flex flex-col justify-center p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: springEasing }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[var(--lime)] font-black tracking-widest uppercase text-xs">Step 01/02</span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  WHO ARE <br /> <span className="text-[var(--lime)]">YOU?</span>
                </h1>
                <p className="text-white/60 text-lg">Let's set up your spendx identity.</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input 
                    placeholder="First Name" 
                    value={formData.firstName}
                    className="w-full p-6 pl-12 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[var(--lime)] transition-all text-xl font-bold"
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input 
                    placeholder="Username" 
                    value={formData.username}
                    className="w-full p-6 pl-12 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[var(--lime)] transition-all text-xl font-bold"
                    onChange={e => setFormData({...formData, username: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <select 
                    value={formData.city}
                    className="w-full p-6 pl-12 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[var(--lime)] transition-all text-xl font-bold appearance-none cursor-pointer"
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  >
                    {cities.map(city => <option key={city} value={city} className="bg-black">{city}</option>)}
                  </select>
                </div>
              </div>

              <InteractiveButton 
                onClick={() => setStep(2)} 
                className="w-full py-6 bg-[var(--lime)] text-black font-black text-xl rounded-2xl flex items-center justify-center gap-2 group"
              >
                NEXT STEP <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </InteractiveButton>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: springEasing }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <button onClick={() => setStep(1)} className="text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  ← Back
                </button>
                <span className="text-[var(--magenta)] font-black tracking-widest uppercase text-xs">Step 02/02</span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  PICK A <br /> <span className="text-[var(--magenta)]">VIBE.</span>
                </h1>
                <p className="text-white/60 text-lg">Choose your digital representative.</p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {avatars.map(seed => (
                  <motion.button 
                    key={seed} 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({...formData, avatarSeed: seed})} 
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${formData.avatarSeed === seed ? 'border-[var(--magenta)] bg-[var(--magenta)]/20' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                  >
                    <img 
                      src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`} 
                      alt="avatar" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {formData.avatarSeed === seed && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--magenta)] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={generateAvatars} 
                  className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <RefreshCw className="w-5 h-5" /> RE-ROLL
                </button>
                <InteractiveButton 
                  onClick={saveProfile} 
                  className="flex-[2] py-4 bg-[var(--magenta)] text-white font-black text-xl rounded-2xl"
                >
                  FINISH SETUP
                </InteractiveButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
