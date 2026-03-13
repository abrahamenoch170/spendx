import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { format, isSameDay } from 'date-fns';

export const PlanBottomSheet = ({ selectedDate, onClose }: { selectedDate: Date | null, onClose: () => void }) => {
  const { plans } = useAppStore();
  
  if (!selectedDate) return null;

  const dayPlans = plans.filter(p => isSameDay(new Date(p.createdAt), selectedDate));

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed bottom-0 left-0 right-0 h-[60vh] bg-[#0A0A0A]/80 backdrop-blur-lg border-t border-white/10 rounded-t-3xl p-6 z-[2000]"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-light">{format(selectedDate, 'MMMM d, yyyy')}</h3>
        <button onClick={onClose} className="text-white/50">Close</button>
      </div>
      <div className="space-y-4">
        {dayPlans.map(plan => (
          <div key={plan.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
            <p className="font-medium">{plan.name}</p>
            <p className="text-xs text-white/50">{plan.stops.join(', ')}</p>
          </div>
        ))}
        <button className="w-full py-4 border border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2">
          <Plus size={16} /> Add New Plan
        </button>
      </div>
    </motion.div>
  );
};
