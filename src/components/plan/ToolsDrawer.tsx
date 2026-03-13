import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { usePlanStore } from '../../store/planStore';

export const ToolsDrawer = () => {
  const { budgets, reminders } = usePlanStore();
  const totalBudget = budgets.reduce((acc, b) => acc + b.amount, 0);

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
        <Calendar />
      </div>

      <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
        <h3 className="font-bold mb-4">Budget</h3>
        {budgets.map(b => (
          <div key={b.id} className="flex justify-between text-sm mb-2">
            <span>{b.name}</span>
            <span>${b.amount}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-2 mt-2 font-bold flex justify-between">
          <span>Total</span>
          <span>${totalBudget}</span>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
        <h3 className="font-bold mb-4">Upcoming Reminders</h3>
        {reminders.map(r => (
          <div key={r.id} className="text-sm mb-2">{r.text} - {r.time}</div>
        ))}
        <button className="w-full bg-[#D4FF00] text-black font-bold py-2 rounded-full mt-4">Add Reminder</button>
      </div>
    </div>
  );
};
