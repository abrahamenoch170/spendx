'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Users, 
  QrCode, 
  BarChart3, 
  Megaphone, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Share2,
  Download,
  Camera,
  X
} from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  registered: number;
  checkedIn: number;
  status: 'upcoming' | 'live' | 'completed';
}

export const EnterpriseTab = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    { id: 'e1', name: 'Tech Noir Night', date: '2026-03-15', location: 'The Alchemist', registered: 120, checkedIn: 0, status: 'upcoming' },
    { id: 'e2', name: 'Underground Beats', date: '2026-03-12', location: 'Fabric London', registered: 450, checkedIn: 312, status: 'live' },
  ]);

  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    price: ''
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: Math.random().toString(36).substring(7),
      name: newEvent.name,
      date: newEvent.date,
      location: newEvent.location,
      registered: 0,
      checkedIn: 0,
      status: 'upcoming'
    };
    setEvents([event, ...events]);
    setShowCreateModal(false);
    setNewEvent({ name: '', date: '', location: '', description: '', price: '' });
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)] overflow-y-auto pb-32">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tighter uppercase">Admin Console</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Enterprise Mode Active</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="w-12 h-12 rounded-2xl bg-[var(--lime)] flex items-center justify-center text-black shadow-[0_0_20px_rgba(204,255,0,0.3)]"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="px-6 grid grid-cols-3 gap-3 mb-8">
        <div className="bg-[var(--card-bg)] p-4 rounded-3xl border border-white/5 text-center">
          <div className="text-xl font-black text-[var(--lime)]">572</div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Total Reach</div>
        </div>
        <div className="bg-[var(--card-bg)] p-4 rounded-3xl border border-white/5 text-center">
          <div className="text-xl font-black text-[var(--cyan)]">84%</div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Avg. Check-in</div>
        </div>
        <div className="bg-[var(--card-bg)] p-4 rounded-3xl border border-white/5 text-center">
          <div className="text-xl font-black text-[var(--magenta)]">£4.2k</div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Revenue</div>
        </div>
      </div>

      {/* Events List */}
      <div className="px-6 space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-2">Active Events</h3>
        {events.map((event) => (
          <div key={event.id} className="bg-[var(--card-bg)] rounded-[32px] border border-white/5 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-black tracking-tight">{event.name}</h4>
                    {event.status === 'live' && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[8px] font-black uppercase tracking-widest animate-pulse">
                        <div className="w-1 h-1 rounded-full bg-red-500" /> Live
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 font-medium">{event.location} • {event.date}</p>
                </div>
                <button 
                  onClick={() => setShowScanner(true)}
                  className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
                >
                  <QrCode className="w-5 h-5 text-[var(--lime)]" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Registered</div>
                  <div className="text-xl font-black">{event.registered}</div>
                </div>
                <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Checked In</div>
                  <div className="text-xl font-black text-[var(--lime)]">{event.checkedIn}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Megaphone className="w-3 h-3" /> Broadcast
                </button>
                <button className="flex-1 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <BarChart3 className="w-3 h-3" /> Report
                </button>
                <button className="p-3 bg-red-500/10 rounded-2xl text-red-500 hover:bg-red-500/20 transition-all">
                  <AlertTriangle className="w-4 h-4" />
                </button>
              </div>

              {/* Safe Arrival Tracking */}
              <div className="mt-4 p-4 bg-[var(--lime)]/5 rounded-2xl border border-[var(--lime)]/10">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[8px] font-black uppercase tracking-widest text-[var(--lime)]">Safe Arrival Tracking</div>
                  <div className="text-[8px] font-bold text-white/40">24 / 312 Home</div>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[8%] h-full bg-[var(--lime)]" />
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-4 flex justify-between items-center px-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <Share2 className="w-3 h-3" /> spendx.app/e/{event.id}
              </div>
              <button className="text-[10px] font-black text-[var(--lime)] uppercase tracking-widest">Copy Link</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 w-full bg-[var(--bg-color)] rounded-t-[40px] border-t border-white/10 z-[1101] p-8 pb-12"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Create Event</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block px-2">Event Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Summer Solstice Rave"
                    className="w-full bg-[var(--card-bg)] border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[var(--lime)] transition-colors"
                    value={newEvent.name}
                    onChange={e => setNewEvent({...newEvent, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block px-2">Date</label>
                    <input 
                      required
                      type="date" 
                      className="w-full bg-[var(--card-bg)] border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[var(--lime)] transition-colors"
                      value={newEvent.date}
                      onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block px-2">Price (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="£0.00"
                      className="w-full bg-[var(--card-bg)] border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[var(--lime)] transition-colors"
                      value={newEvent.price}
                      onChange={e => setNewEvent({...newEvent, price: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block px-2">Location</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Venue name or address"
                    className="w-full bg-[var(--card-bg)] border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[var(--lime)] transition-colors"
                    value={newEvent.location}
                    onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-[var(--lime)] text-black rounded-3xl font-black text-lg shadow-[0_0_30px_rgba(204,255,0,0.3)] mt-4"
                >
                  LAUNCH EVENT*
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QR Scanner Mock */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[1200] bg-black flex flex-col"
          >
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-xl font-black uppercase tracking-tighter">Check-in Scanner</h2>
              <button onClick={() => setShowScanner(false)} className="p-2 bg-white/10 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="relative w-full aspect-square max-w-sm rounded-[40px] border-4 border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--lime)]/20 to-transparent animate-scan" />
                <div className="absolute inset-8 border-2 border-dashed border-[var(--lime)]/40 rounded-[32px]" />
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-white/20" />
                </div>
              </div>
              <p className="mt-8 text-sm font-bold text-white/40 uppercase tracking-widest">Align QR code within frame</p>
            </div>

            <div className="p-8 bg-white/5 rounded-t-[40px]">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[var(--lime)]/20 flex items-center justify-center text-[var(--lime)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Last Check-in</h4>
                  <p className="text-xs text-white/40">Jordan Smith • 2 mins ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
