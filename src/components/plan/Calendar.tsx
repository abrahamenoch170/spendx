import React, { useState } from 'react';
import { format, addMonths, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

const getStartOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const getStartOfWeek = (date: Date) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - copy.getDay());
  copy.setHours(0, 0, 0, 0);
  return copy;
};
const getEndOfWeek = (date: Date) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + (6 - copy.getDay()));
  copy.setHours(23, 59, 59, 999);
  return copy;
};
const getPreviousMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const Calendar = ({ onSelectDate }: { onSelectDate: (date: Date) => void }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { plans } = useAppStore();

  const monthStart = getStartOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = getStartOfWeek(monthStart);
  const endDate = getEndOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const hasPlan = (day: Date) => plans.some(p => isSameDay(new Date(p.createdAt), day));

  return (
    <div className="bg-[#0A0A0A] p-4 rounded-3xl border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-light">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <button onClick={() => setCurrentMonth(getPreviousMonth(currentMonth))}><ChevronLeft /></button>
          <button onClick={() => setCurrentMonth(new Date())} className="text-xs border border-white/20 px-2 py-1 rounded-md">Today</button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRight /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-white/50 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, i) => (
          <motion.button
            key={i}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            onClick={() => onSelectDate(day)}
            className={`h-10 w-10 flex flex-col items-center justify-center rounded-xl text-sm relative
              ${!isSameMonth(day, monthStart) ? 'text-white/20' : 'text-white'}
              ${isToday(day) ? 'border border-[#CCFF00]' : ''}`}
          >
            {format(day, 'd')}
            {hasPlan(day) && <div className="w-1 h-1 bg-[#CCFF00] rounded-full absolute bottom-1" />}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
