import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Ticket } from '../../store/appStore';
import { CheckInModal } from './CheckInModal';

export const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => !ticket.checkedIn && setIsModalOpen(true)}
        className={`p-6 rounded-3xl border border-white/10 bg-white/5 cursor-pointer transition-transform hover:scale-[1.02] ${ticket.checkedIn ? 'opacity-50' : ''}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{ticket.eventName}</h3>
            <p className="text-xs text-white/50">{ticket.attendeeName} • {ticket.date}</p>
          </div>
          {ticket.checkedIn && (
            <span className="bg-[#CCFF00] text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">Checked In</span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs font-mono text-white/30">{ticket.secret}</p>
          <div className="bg-white p-2 rounded-xl">
            <QRCode size={64} value={JSON.stringify({ eventId: ticket.eventId, attendeeId: ticket.id, secret: ticket.secret })} />
          </div>
        </div>
      </div>
      {isModalOpen && <CheckInModal ticket={ticket} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
