import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, useAppStore } from '../../store/appStore';

export const CheckInModal = ({ ticket, onClose }: { ticket: Ticket; onClose: () => void }) => {
  const { checkInTicket } = useAppStore();

  const handleCheckIn = () => {
    checkInTicket(ticket.id);
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
        <h2 className="text-xl font-light mb-6">Check In</h2>
        <p className="text-sm text-white/50 mb-2">Event: {ticket.eventName}</p>
        <p className="text-sm text-white/50 mb-2">Attendee: {ticket.attendeeName}</p>
        <p className="text-sm text-white/50 mb-6">Date: {ticket.date}</p>
        
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 p-4 rounded-xl border border-white/10">Cancel</button>
          <button onClick={handleCheckIn} className="flex-1 p-4 rounded-xl bg-[#CCFF00] text-black font-bold">Check In</button>
        </div>
      </div>
    </motion.div>
  );
};
