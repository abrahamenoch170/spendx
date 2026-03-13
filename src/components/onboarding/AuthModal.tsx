import React from 'react';
import { motion } from 'framer-motion';
import { AuthOption } from './AuthOption';
import { AlertCircle, User, Zap, Smartphone, Camera } from 'lucide-react';

interface AuthModalProps {
  onAuth: (provider: string) => void;
  onAnonymous: () => void;
}

export const AuthModal = ({ onAuth, onAnonymous }: AuthModalProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="w-full max-w-md bg-spendx-black/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-spendx-lime/10 to-transparent opacity-50" />
      
      <h1 className="text-xl font-black text-center mb-8 uppercase tracking-widest">
        SPENDX™ SELECT YOUR ENTRY POINT
      </h1>

      <div className="space-y-4 relative z-10">
        <AuthOption 
          logo={<Zap className="w-6 h-6 text-spendx-lime" />}
          title="Just Use Google"
          illustration={<div className="w-8 h-8 rounded-full bg-spendx-lime/20" />}
          color="var(--acid-lime)"
          onClick={() => onAuth('Google')}
        />
        <AuthOption 
          logo={<User className="w-6 h-6 text-white" />}
          title="Maybe Apple"
          illustration={<div className="w-8 h-8 rounded-full bg-white/20" />}
          color="white"
          onClick={() => onAuth('Apple')}
        />
        <AuthOption 
          logo={<Camera className="w-6 h-6 text-spendx-magenta" />}
          title="Move with Snapchat"
          illustration={<div className="w-8 h-8 rounded-full bg-spendx-magenta/20" />}
          color="var(--hot-magenta)"
          onClick={() => onAuth('Snapchat')}
        />
        <AuthOption 
          logo={<Smartphone className="w-6 h-6 text-spendx-cyan" />}
          title="Continue with Instagram"
          illustration={<div className="w-8 h-8 rounded-full bg-spendx-cyan/20" />}
          color="var(--electric-cyan)"
          onClick={() => onAuth('Instagram')}
        />

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-spendx-black px-4 text-white/30 tracking-[0.3em]">OR</span></div>
        </div>

        <button
          onClick={onAnonymous}
          className="w-full flex items-center justify-center gap-3 p-4 border border-white/20 rounded-2xl text-white/60 hover:text-white hover:border-white/40 transition-colors"
        >
          <AlertCircle className="w-5 h-5" />
          <div className="text-left">
            <p className="font-bold">Stay Anonymous</p>
            <p className="text-[10px] uppercase tracking-wider">Limited Features</p>
          </div>
        </button>
      </div>
    </motion.div>
  );
};
