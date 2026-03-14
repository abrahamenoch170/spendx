import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from './Calendar';
import { PlanBottomSheet } from './PlanBottomSheet';
import { AlarmSection } from './AlarmSection';
import { BudgetCalculator } from './BudgetCalculator';
import { TicketSection } from './TicketSection';
import { RecapGenerator } from './RecapGenerator';
import { Leaderboard } from './Leaderboard';
import { RedCarpetToggle } from './RedCarpetToggle';

export const PlanTab = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="h-full bg-[#050505] text-white p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Plan</h1>
        <button onClick={() => setShowLeaderboard(true)} className="bg-white/5 px-4 py-2 rounded-full text-sm">Leaderboard</button>
      </div>
      <Calendar onSelectDate={setSelectedDate} />
      <AlarmSection />
      <BudgetCalculator />
      <TicketSection />
      <RedCarpetToggle />
      <RecapGenerator />
      
      <AnimatePresence>
        {selectedDate && (
          <PlanBottomSheet selectedDate={selectedDate} onClose={() => setSelectedDate(null)} />
        )}
        {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
      </AnimatePresence>
    </div>
  );
};
