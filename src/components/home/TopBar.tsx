import React from 'react';
import { Bell } from 'lucide-react';
import { useHomeStore } from '../../store/homeStore';

const CITIES = ["London", "New York City", "Lagos", "Toronto", "Berlin", "Paris", "Dubai", "Tokyo", "Singapore", "Barcelona"];

export const TopBar = () => {
  const { notifications } = useHomeStore();
  return (
    <div className="flex items-center justify-between p-6">
      <div className="text-2xl font-black uppercase tracking-tighter text-[#D4FF00]">Spendx</div>
      <div className="flex items-center gap-4">
        <select className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm uppercase">
          {CITIES.map(city => <option key={city}>{city}</option>)}
        </select>
        <div className="relative">
          <Bell className="w-6 h-6" />
          {notifications > 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-[#FF007A] rounded-full" />}
        </div>
      </div>
    </div>
  );
};
