import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, UserCheck, Map, Bell, Camera } from 'lucide-react';

export const EnterpriseGroup = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Agenda', 'Ticketing', 'Check in', 'Attendee List', 'Event Map', 'Broadcast', 'Red Carpet Filter'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${activeTab === tab ? 'bg-[#D4FF00] text-black' : 'bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-4">{activeTab}</h2>
        {activeTab === 'Ticketing' && <button className="bg-[#D4FF00] text-black font-bold px-6 py-3 rounded-full">Generate QR Ticket</button>}
        {activeTab === 'Check in' && <button className="bg-[#00E5FF] text-black font-bold px-6 py-3 rounded-full">Scan Attendee</button>}
        {activeTab === 'Broadcast' && <button className="bg-[#FF007A] text-white font-bold px-6 py-3 rounded-full">Send Notification</button>}
        {activeTab === 'Event Map' && <div className="h-48 bg-white/10 rounded-2xl flex items-center justify-center">Indoor Map with Emergency Overlay</div>}
      </div>
    </motion.div>
  );
};
