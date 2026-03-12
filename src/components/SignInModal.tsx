'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Apple, Instagram, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SignInModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate();

  const handleSignIn = (provider: string) => {
    console.log(`Signing in with ${provider}`);
    onClose();
    // Use a small timeout to ensure the modal animation finishes or just navigate
    setTimeout(() => {
      navigate('/onboarding');
    }, 100);
  };

  const providers = [
    { name: 'Google', icon: <Chrome className="w-5 h-5" />, color: 'hover:bg-white/10' },
    { name: 'Apple', icon: <Apple className="w-5 h-5" />, color: 'hover:bg-white/10' },
    { name: 'Snapchat', icon: <div className="w-5 h-5 bg-yellow-400 rounded-sm" />, color: 'hover:bg-yellow-400/10' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: 'hover:bg-pink-500/10' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[var(--lime)] via-[var(--magenta)] to-[var(--cyan)]" />
            
            <div className="p-8">
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-8">
                <h2 className="text-3xl font-black tracking-tighter text-white mb-2">WELCOME TO SPENDX*</h2>
                <p className="text-white/50 text-sm font-medium uppercase tracking-widest">Select your entry point</p>
              </div>
              
              <div className="flex flex-col gap-3">
                {providers.map((p) => (
                  <button 
                    key={p.name}
                    onClick={() => handleSignIn(p.name)}
                    className={`flex items-center justify-between w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-white font-bold transition-all duration-200 group ${p.color} hover:border-white/20 active:scale-[0.98]`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        {p.icon}
                      </div>
                      <span className="text-lg">Continue with {p.name}</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[var(--lime)] transition-colors" />
                  </button>
                ))}
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0A0A0A] px-4 text-white/30 tracking-widest">or</span></div>
                </div>

                <button 
                  onClick={() => handleSignIn('Phone')}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[var(--lime)] text-black font-black text-lg hover:brightness-110 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                >
                  <Phone className="w-5 h-5" />
                  USE PHONE NUMBER
                </button>
              </div>

              <p className="mt-8 text-center text-[10px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                By continuing, you agree to the Spendx <br />
                <span className="text-white/60 cursor-pointer hover:text-[var(--lime)]">Terms of Service</span> & <span className="text-white/60 cursor-pointer hover:text-[var(--lime)]">Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
