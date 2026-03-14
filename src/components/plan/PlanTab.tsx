import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTab } from '../../context/TabContext';
import { usePlanStore } from '../../store/planStore';
import { useMapStore } from '../../store/mapStore';

import { BudgetTab } from './BudgetTab';

export const PlanTab = () => {
  const { setActiveTab } = useTab();
  const { activeMode } = useMapStore();
  const { availability } = usePlanStore();
  const [view, setView] = useState<'week' | 'month' | 'budget'>('week');

  return (
    <div className="p-6 h-full flex flex-col bg-[var(--pure-black)] text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('home')}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold capitalize">{activeMode} Planning</h1>
        </div>
        <div className="bg-white/5 p-1 rounded-full flex gap-1 border border-white/10">
          <button onClick={() => setView('week')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${view === 'week' ? 'bg-white text-black' : 'text-white/50'}`}>Week</button>
          <button onClick={() => setView('month')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${view === 'month' ? 'bg-white text-black' : 'text-white/50'}`}>Month</button>
          <button onClick={() => setView('budget')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${view === 'budget' ? 'bg-white text-black' : 'text-white/50'}`}>Budget</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === 'week' ? (
          <WeekView availability={availability} activeMode={activeMode} />
        ) : view === 'month' ? (
          <MonthView availability={availability} activeMode={activeMode} />
        ) : (
          <BudgetTab />
        )}
      </div>

      {view !== 'budget' && (
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 bg-[var(--acid-lime)] text-black rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(204,255,0,0.3)] mt-4 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          AI Suggest
        </motion.button>
      )}
    </div>
  );
};

const WeekView = ({ availability, activeMode }: any) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9AM - 9PM
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="flex gap-2 overflow-x-auto pb-4">
      {days.map(day => (
        <div key={day} className="flex flex-col gap-2 min-w-[60px]">
          <span className="text-center text-xs font-bold text-white/50">{day}</span>
          {hours.map(hour => (
            <motion.div 
              key={hour}
              whileTap={{ scale: 0.95 }}
              className="h-10 w-full bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-[10px] text-white/30"
            >
              {hour}:00
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

const MonthView = ({ availability, activeMode }: any) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(day => (
        <div key={day} className="h-20 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-between p-2">
          <span className="text-xs font-bold text-white/50">{day}</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[var(--acid-lime)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--hot-magenta)]" />
          </div>
        </div>
      ))}
    </div>
  );
};
