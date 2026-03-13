import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Camera, Map, LayoutDashboard } from 'lucide-react';

export const PartyGroup = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Guest List', 'Budget Tracker', 'Snapchat Filter', 'Event Map'];

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
        {activeTab === 'Overview' && <p>Party details and summary.</p>}
        {activeTab === 'Guest List' && <p>RSVP tracking.</p>}
        {activeTab === 'Budget Tracker' && <p>Budget splitting tools.</p>}
        {activeTab === 'Snapchat Filter' && <p>Snapchat filter mock creation tool.</p>}
        {activeTab === 'Event Map' && <p>Indoor map generator.</p>}
      </div>
    </motion.div>
  );
};
