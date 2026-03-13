import React from 'react';
import { useAppStore } from '../../store/appStore';
import { TicketCard } from './TicketCard';

export const TicketSection = () => {
  const { tickets } = useAppStore();

  return (
    <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 mt-6">
      <h2 className="text-xl font-light mb-6">Tickets</h2>
      <div className="space-y-4">
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
