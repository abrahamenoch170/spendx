'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapCanvas } from './MapCanvas';
import { useMapState } from '../hooks/useMapState';
import { useLayers } from '../hooks/useLayers';
import { MessageSquare, Phone, Video, Info, Send, MapPin, Users } from 'lucide-react';

export const SquadTab = () => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [centerTrigger, setCenterTrigger] = useState(0);
  const { center, zoom } = useMapState();
  const { layers } = useLayers();
  const [messages, setMessages] = useState([
    { id: 1, user: 'Sam', text: 'Where we heading?', time: '12:01' },
    { id: 2, user: 'Jordan', text: 'The Alchemist is looking live right now 🔥', time: '12:03' },
    { id: 3, user: 'Alex', text: 'I\'m 5 mins away', time: '12:05' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      user: 'Me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleDropPin = (location: string) => {
    const systemMessage = {
      id: Date.now(),
      user: 'SYSTEM',
      text: `📍 Pin dropped: ${location}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, systemMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)] relative overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--magenta)] flex items-center justify-center font-bold">S</div>
          <div>
            <h2 className="font-bold">The Squad</h2>
            <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">4 members active</p>
          </div>
        </div>
        <div className="flex gap-4 text-white/60">
          <Phone className="w-5 h-5 cursor-pointer hover:text-white" />
          <Video className="w-5 h-5 cursor-pointer hover:text-white" />
          <Info className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Mini Map / Expanded Map */}
      <div 
        className={`relative transition-all duration-500 ease-in-out ${isMapExpanded ? 'h-full z-50' : 'h-48'}`}
        onClick={() => !isMapExpanded && setIsMapExpanded(true)}
      >
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/40 to-transparent h-12" />
        <MapCanvas 
          center={center} 
          zoom={zoom} 
          layers={{ ...layers, heatmap: false, venues: false, squad: true, user: true }}
          ghostMode={false}
          venueFilter="all"
          isSquadOnly={isMapExpanded}
          onDropPin={handleDropPin}
          centerTrigger={centerTrigger}
        />
        
        {isMapExpanded && (
          <div className="absolute top-6 left-6 z-[1001] pointer-events-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMapExpanded(false); }}
              className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl"
            >
              ← Back to Chat
            </button>
          </div>
        )}

        {isMapExpanded && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[1001] pointer-events-auto flex flex-col items-center gap-4">
            <button 
              className="bg-[var(--lime)] text-black px-6 py-3 rounded-full font-black text-sm uppercase tracking-tighter shadow-[0_0_20px_rgba(204,255,0,0.4)] flex items-center gap-2"
              onClick={(e) => { e.stopPropagation(); setCenterTrigger(prev => prev + 1); }}
            >
              <Users className="w-4 h-4" />
              Where's everyone?
            </button>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
              Long press to drop pin
            </p>
          </div>
        )}
      </div>

      {/* Chat Area */}
      {!isMapExpanded && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
          <div className="pb-24" /> {/* Spacer for input */}
          {messages.slice().reverse().map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.user === 'Me' ? 'items-end' : 'items-start'}`}>
              {msg.user === 'SYSTEM' ? (
                <div className="w-full flex justify-center my-2">
                  <span className="bg-white/5 text-[var(--lime)] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[var(--lime)]/20">
                    {msg.text}
                  </span>
                </div>
              ) : (
                <>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1 px-2">
                    {msg.user} • {msg.time}
                  </span>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.user === 'Me' ? 'bg-[var(--lime)] text-black rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                    <p className="text-sm font-medium">{msg.text}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      {!isMapExpanded && (
        <div className="absolute bottom-24 left-0 w-full p-4 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 pointer-events-auto shadow-2xl">
            <button className="p-2 text-white/40 hover:text-[var(--lime)]">
              <MapPin className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Message squad..." 
              className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2"
            />
            <button 
              onClick={handleSendMessage}
              className={`p-2 rounded-xl transition-all ${inputText.trim() ? 'bg-[var(--lime)] text-black' : 'text-white/20'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
