'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Users, Briefcase, MapPin, Bell, ShieldCheck, ArrowRight } from 'lucide-react';
import { InteractiveButton } from '@/src/components/InteractiveElements';

const springEasing = [0.34, 1.56, 0.64, 1];

const modes = [
  { id: 'solo', title: 'Solo', subtitle: 'Just me, exploring the city.', color: 'var(--cyan)', icon: User },
  { id: 'squad', title: 'Squad', subtitle: 'With the crew. Sync locations.', color: 'var(--lime)', icon: Users },
  { id: 'enterprise', title: 'Host', subtitle: 'Running an event or venue.', color: 'var(--magenta)', icon: Briefcase },
];

export default function ModesPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [step, setStep] = useState(0); // 0: modes, 1: permissions
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('spendx_has_account') === 'true') {
      navigate('/app/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleModeSelect = (id: string) => {
    setSelectedMode(id);
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
      if ('Notification' in window) {
        await Notification.requestPermission();
      }
    } catch (e) {
      console.log('Notifications denied');
    }

    localStorage.setItem('spendx_has_account', 'true');
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[var(--lime)] selection:text-black overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-[var(--teal)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--lime)] to-transparent" />
      </div>
      <div className="grain-overlay" />

      <div className="relative z-10 max-w-2xl mx-auto min-h-screen flex flex-col justify-center p-6">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div 
              key="modes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: springEasing }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <span className="text-[var(--cyan)] font-black tracking-widest uppercase text-xs">Preference</span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  CHOOSE YOUR <br /> <span className="text-[var(--cyan)]">MODE.</span>
                </h1>
                <p className="text-white/60 text-lg">How are you moving tonight?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {modes.map(mode => (
                  <motion.button 
                    key={mode.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleModeSelect(mode.id)}
                    className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6 border border-white/5 group-hover:border-white/20 transition-colors" style={{ color: mode.color }}>
                      <mode.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight mb-2">{mode.title}</h2>
                    <p className="text-xs text-white/40 font-medium leading-relaxed">{mode.subtitle}</p>
                  </motion.button>
                ))}
              </div>
              
              <button 
                onClick={() => setStep(1)} 
                className="w-full py-4 text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-widest"
              >
                Skip for now
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="permissions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: springEasing }}
              className="space-y-12 text-center"
            >
              <div className="space-y-4">
                <div className="w-24 h-24 bg-[var(--lime)] rounded-[32px] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(204,255,0,0.3)]">
                  <ShieldCheck className="w-12 h-12 text-black" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  READY TO <br /> <span className="text-[var(--lime)]">SYNC?</span>
                </h1>
                <p className="text-white/60 text-lg max-w-md mx-auto">
                  We need location and notifications to keep your spendx alive.
                </p>
              </div>

              <div className="space-y-4 max-w-sm mx-auto">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 text-left">
                  <MapPin className="w-6 h-6 text-[var(--cyan)]" />
                  <div>
                    <p className="font-bold text-sm">Live Location</p>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">For squad sync & safety</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 text-left">
                  <Bell className="w-6 h-6 text-[var(--magenta)]" />
                  <div>
                    <p className="font-bold text-sm">Smart Alerts</p>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">For plan updates & vibes</p>
                  </div>
                </div>
              </div>

              <InteractiveButton 
                onClick={requestPermissions} 
                className="w-full py-6 bg-[var(--lime)] text-black font-black text-xl rounded-2xl flex items-center justify-center gap-2 group"
              >
                LET'S GO <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </InteractiveButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
