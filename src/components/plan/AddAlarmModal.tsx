import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { v4 as uuidv4 } from 'uuid';

export const AddAlarmModal = ({ onClose }: { onClose: () => void }) => {
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('07:00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { addAlarm } = useAppStore();

  const handleSave = () => {
    addAlarm({ id: uuidv4(), description, time, date, enabled: true });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[3000] flex items-center justify-center p-6"
    >
      <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 w-full max-w-sm">
        <h2 className="text-xl font-light mb-6">Add Alarm</h2>
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 p-4 rounded-xl border border-white/10 mb-4"
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-white/5 p-4 rounded-xl border border-white/10 mb-4"
        />
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-white/5 p-4 rounded-xl border border-white/10 mb-6"
        />
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 p-4 rounded-xl border border-white/10">Cancel</button>
          <button onClick={handleSave} className="flex-1 p-4 rounded-xl bg-[#CCFF00] text-black font-bold">Save</button>
        </div>
      </div>
    </motion.div>
  );
};
