import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from './Calendar';
import { PlanBottomSheet } from './PlanBottomSheet';
import { AlarmSection } from './AlarmSection';

export const PlanTab = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="h-full bg-[#050505] text-white p-6 overflow-y-auto">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">Plan</h1>
      <Calendar onSelectDate={setSelectedDate} />
      <AlarmSection />
      
      <AnimatePresence>
        {selectedDate && (
          <PlanBottomSheet selectedDate={selectedDate} onClose={() => setSelectedDate(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
