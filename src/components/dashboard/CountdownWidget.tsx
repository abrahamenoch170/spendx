import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMapStore } from '../../store/mapStore';
import { useTab } from '../../context/TabContext';

export const CountdownWidget = () => {
  const { plans } = useMapStore();
  const { setActiveTab } = useTab();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const plan = plans[currentIndex];

  useEffect(() => {
    if (!plan) return;
    const timer = setInterval(() => {
      const now = new Date();
      const diff = plan.startTime.getTime() - now.getTime();
      setTimeLeft(Math.max(0, diff));
    }, 1000);
    return () => clearInterval(timer);
  }, [plan]);

  if (plans.length === 0) {
    return (
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
        <h3 className="text-xl font-black mb-4">No plans yet</h3>
        <button
          onClick={() => setActiveTab('plan')}
          className="w-full py-3 border border-[var(--lime)] text-[var(--lime)] font-bold rounded-xl hover:bg-[var(--lime)] hover:text-black transition-colors"
        >
          Plan something
        </button>
      </div>
    );
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, { offset }) => {
        if (offset.x < -50) setCurrentIndex(prev => Math.min(prev + 1, plans.length - 1));
        if (offset.x > 50) setCurrentIndex(prev => Math.max(prev - 1, 0));
      }}
      className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden"
    >
      <h3 className="text-lg font-bold mb-1">{plan.title}</h3>
      <p className="text-sm text-white/50 mb-4">{plan.venueName}</p>
      <div className="text-4xl font-black mb-4 font-mono flex gap-1">
        <AnimatePresence mode="popLayout">
          <motion.span key={hours} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>{hours}h</motion.span>
          <motion.span key={minutes} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>{minutes}m</motion.span>
        </AnimatePresence>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--lime)]"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, 100 - (timeLeft / (1000 * 60 * 60 * 24)) * 100))}%` }}
        />
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {plans.map((_, i) => (
          <motion.div 
            key={i} 
            animate={{ scale: i === currentIndex ? 1.2 : 1 }}
            className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-[var(--lime)]' : 'bg-white/20'}`} 
          />
        ))}
      </div>
    </motion.div>
  );
};
