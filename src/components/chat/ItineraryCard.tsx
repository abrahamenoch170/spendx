import React from 'react';
import { MapPin, Clock, DollarSign, ArrowRight } from 'lucide-react';

export const ItineraryCard = ({ routeName, stops, totalBudget, totalTime, distance }: any) => {
  return (
    <div className="bg-[var(--card-bg)] rounded-3xl p-6 border border-[var(--border-color)] shadow-xl">
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{routeName}</h3>
      <div className="relative flex flex-col gap-4 mb-6">
        {stops.map((stop: any, index: number) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-[var(--lime)]" />
              {index < stops.length - 1 && <div className="w-0.5 h-12 bg-[var(--lime)]/50 my-1" />}
            </div>
            <div className="flex-1">
              <p className="font-bold text-[var(--text-primary)]">{stop.name}</p>
              <div className="flex gap-2 text-sm text-[var(--text-secondary)]">
                <span>{stop.category}</span>
                <span>•</span>
                <span>{stop.cost}</span>
                <span>•</span>
                <span>{stop.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-[var(--text-secondary)] mb-6">
        <span>Budget: {totalBudget}</span>
        <span>Time: {totalTime}</span>
        <span>Dist: {distance}</span>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-3 rounded-xl bg-[var(--lime)] text-black font-bold">Lock this in</button>
        <button className="flex-1 py-3 rounded-xl border border-[var(--cyan)] text-[var(--cyan)] font-bold">Switch it up</button>
      </div>
    </div>
  );
};
