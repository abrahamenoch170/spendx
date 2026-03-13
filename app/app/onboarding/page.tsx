"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkle, ArrowRight } from '@phosphor-icons/react';

export default function Onboarding() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white selection:bg-[var(--lime)] selection:text-black">
      <div className="grain-overlay" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 rounded-[2.5rem] bg-white/5 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--lime)]/10 blur-[60px]" />
        
        <div className="flex items-center gap-2 text-[var(--lime)] text-xs font-bold tracking-widest uppercase mb-6">
          <Sparkle size={16} weight="fill" />
          <span>Setup your squad</span>
        </div>

        <h1 className="text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
          Ready to<br />Spendx?
        </h1>
        
        <p className="text-white/40 text-sm mb-10 leading-relaxed">
          Set up your profile, connect your squad, and start tracking expenses in real-time.
        </p>

        <button 
          onClick={() => router.push('/app')}
          className="group w-full bg-[var(--lime)] text-black px-8 py-5 rounded-2xl font-black text-xl flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>GET STARTED</span>
          <ArrowRight size={24} weight="bold" className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <div className="mt-8 text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
        Spendx* v1.0.4
      </div>
    </div>
  );
}
