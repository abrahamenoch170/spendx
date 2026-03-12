'use client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  QrCode, 
  ArrowRight,
  Info,
  ShieldCheck
} from 'lucide-react';

export const PublicEventPage = () => {
  const { id } = useParams();
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    squadSize: '1'
  });

  // Mock event data
  const event = {
    name: 'Tech Noir Night',
    date: 'Friday, March 15 • 10:00 PM',
    location: 'The Alchemist, London',
    description: 'Join us for an immersive night of cyber-beats and neon-noir vibes. Exclusive entry for Spendx members.',
    price: 'Free'
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  if (registered) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex flex-col items-center justify-center p-8 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[var(--card-bg)] p-8 rounded-[48px] border border-[var(--lime)]/30 shadow-[0_0_50px_rgba(204,255,0,0.1)] max-w-sm w-full"
        >
          <div className="w-20 h-20 bg-[var(--lime)] rounded-full flex items-center justify-center mx-auto mb-6 text-black shadow-[0_0_30px_rgba(204,255,0,0.4)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">You're In!</h1>
          <p className="text-white/60 text-sm mb-8">Registration confirmed for {event.name}. See you there!</p>
          
          <div className="bg-white p-6 rounded-3xl mb-8 flex items-center justify-center">
            <QrCode className="w-48 h-48 text-black" />
          </div>
          
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">
            Show this code at the door
          </div>

          <button className="w-full py-4 bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-xs border border-white/10">
            Add to Wallet
          </button>
        </motion.div>
        
        <button className="mt-8 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-[var(--lime)] transition-colors">
          Download Spendx App
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] font-sans">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src="https://picsum.photos/seed/technoir/800/600" alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">{event.name}</h1>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--lime)]">
            <ShieldCheck className="w-3 h-3" /> Verified Spendx Event
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 max-w-2xl mx-auto">
        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--card-bg)] p-4 rounded-3xl border border-white/5">
            <Calendar className="w-5 h-5 text-[var(--magenta)] mb-2" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">When</div>
            <div className="text-sm font-bold">{event.date}</div>
          </div>
          <div className="bg-[var(--card-bg)] p-4 rounded-3xl border border-white/5">
            <MapPin className="w-5 h-5 text-[var(--cyan)] mb-2" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Where</div>
            <div className="text-sm font-bold">{event.location}</div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-2 flex items-center gap-2">
            <Info className="w-3 h-3" /> About the event
          </h3>
          <div className="bg-[var(--card-bg)] p-6 rounded-[32px] border border-white/5">
            <p className="text-sm text-white/80 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-2">Register Now</h3>
          <form onSubmit={handleRegister} className="bg-[var(--card-bg)] p-6 rounded-[32px] border border-white/5 space-y-4">
            <div>
              <input 
                required
                type="text" 
                placeholder="Full Name"
                className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[var(--lime)] transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <input 
                required
                type="email" 
                placeholder="Email Address"
                className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[var(--lime)] transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <select 
                className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[var(--lime)] transition-colors appearance-none"
                value={formData.squadSize}
                onChange={e => setFormData({...formData, squadSize: e.target.value})}
              >
                <option value="1">Just me</option>
                <option value="2">Squad of 2</option>
                <option value="3">Squad of 3</option>
                <option value="4">Squad of 4</option>
                <option value="5+">Squad of 5+</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-[var(--lime)] text-black rounded-3xl font-black text-lg shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2"
            >
              GET TICKETS <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="text-center pt-8 pb-12">
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Powered by Spendx Enterprise</p>
        </div>
      </div>
    </div>
  );
};
