import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapCanvas } from './MapCanvas';
import { useMapState } from '../hooks/useMapState';
import { useLayers } from '../hooks/useLayers';
import { MessageSquare, Phone, Video, Info, Send, MapPin, Users, Zap, Settings, ChevronLeft, Ghost, Link, Calculator } from 'lucide-react';
import { ItineraryCard } from './ItineraryCard';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  isAI?: boolean;
  isSystem?: boolean;
  itinerary?: any;
  expired?: boolean;
  expiresAt?: number;
}

export const SquadRoom = ({ squadId, onBack }: { squadId: string, onBack: () => void }) => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [centerTrigger, setCenterTrigger] = useState(0);
  const { center, zoom } = useMapState();
  const { layers } = useLayers();
  const [inputText, setInputText] = useState('');
  const [ghostMode, setGhostMode] = useState(false);
  const [disappearing, setDisappearing] = useState<'off' | '24h' | '7d'>('off');
  const [showSettings, setShowSettings] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: 3, user: 'Alex', text: 'I\'m 5 mins away', time: '12:05' },
    { id: 2, user: 'Jordan', text: 'The Alchemist is looking live right now 🔥', time: '12:03' },
    { id: 1, user: 'Sam', text: 'Where we heading?', time: '12:01' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle disappearing messages
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setMessages(prev => prev.map(msg => {
        if (msg.expired) return msg;
        if (msg.expiresAt && now > msg.expiresAt) {
          return { ...msg, text: 'This message has expired.', expired: true, itinerary: undefined };
        }
        return msg;
      }));
    }, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    let expiresAt: number | undefined;
    if (disappearing === '24h') expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    if (disappearing === '7d') expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    // For testing purposes, if disappearing is not off, let's make it expire in 10 seconds
    // if (disappearing !== 'off') expiresAt = Date.now() + 10000;

    const newMessage: Message = {
      id: Date.now(),
      user: 'Me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expiresAt
    };
    
    setMessages(prev => [newMessage, ...prev]);
    setInputText('');

    // Mock AI Response
    if (inputText.toLowerCase().includes('@spendx') || inputText.toLowerCase().includes('ai')) {
      setTimeout(() => {
        const aiMessage: Message = {
          id: Date.now() + 1,
          user: 'Spendx AI',
          text: `I found a great route for the squad!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAI: true,
          expiresAt,
          itinerary: {
            title: '🔥 The Weekend Warmup',
            stops: [
              { id: 's1', name: 'The Alchemist', category: 'drink', cost: '££', time: '8:00 PM', affiliates: ['uber'] },
              { id: 's2', name: 'Dishoom', category: 'food', cost: '£££', time: '9:30 PM', affiliates: ['resy'] },
              { id: 's3', name: 'Fabric', category: 'club', cost: '££££', time: '11:30 PM', affiliates: ['dice'] },
            ],
            budget: '£80-120',
            totalTime: '4.5 hrs',
            distance: '1.2 mi'
          }
        };
        setMessages(prev => [aiMessage, ...prev]);
      }, 1500);
    }
  };

  const handleDropPin = (location: string) => {
    const systemMessage: Message = {
      id: Date.now(),
      user: 'SYSTEM',
      text: `📍 Pin dropped: ${location}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: true
    };
    setMessages(prev => [systemMessage, ...prev]);
  };

  const handleInvite = () => {
    const link = `spendx.app/r/${squadId}`;
    if (navigator.share) {
      navigator.share({ title: 'Join my Squad on Spendx', url: link });
    } else {
      navigator.clipboard.writeText(link);
      alert('Invite link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[var(--bg-color)] relative overflow-hidden">
      {/* Top Bar */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/80 backdrop-blur-xl z-[100]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex -space-x-2">
            {['Sam', 'Jordan', 'Alex'].map((m, i) => (
              <img key={i} src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${m}`} alt={m} className="w-8 h-8 rounded-full border-2 border-black bg-white/10" />
            ))}
          </div>
          <div>
            <h2 className="font-bold text-sm">Weekend Warriors</h2>
            <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">4 members</p>
          </div>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* AI Presence Bar */}
      <div className="bg-gradient-to-r from-[var(--cyan)]/20 to-transparent border-b border-[var(--cyan)]/30 px-4 py-1.5 flex items-center gap-2 z-[99]">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--cyan)]">Spendx AI is in this room</span>
      </div>

      {/* Settings Panel (Overlay) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-[var(--card-bg)] border border-white/10 rounded-2xl p-4 z-[101] shadow-2xl backdrop-blur-xl"
          >
            <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-white/60">Squad Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold mb-2 block">Disappearing Messages</label>
                <div className="flex gap-2">
                  {['off', '24h', '7d'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setDisappearing(opt as any)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${disappearing === opt ? 'bg-[var(--lime)] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      {!isMapExpanded && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse pb-40">
          <div ref={messagesEndRef} />
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.user === 'Me' ? 'items-end' : 'items-start'}`}>
              {msg.isSystem ? (
                <div className="w-full flex justify-center my-2">
                  <span className="bg-white/5 text-[var(--lime)] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[var(--lime)]/20">
                    {msg.text}
                  </span>
                </div>
              ) : (
                <div className={`flex gap-2 max-w-[85%] ${msg.user === 'Me' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar for others */}
                  {msg.user !== 'Me' && !msg.isAI && (
                    <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${msg.user}`} alt={msg.user} className="w-8 h-8 rounded-full border border-white/10 bg-white/5 shrink-0 mt-4" />
                  )}
                  {msg.isAI && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--magenta)] flex items-center justify-center shrink-0 mt-4 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col ${msg.user === 'Me' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1 px-1">
                      {msg.user} • {msg.time}
                    </span>
                    
                    {msg.itinerary ? (
                      <ItineraryCard 
                        {...msg.itinerary} 
                        isSquad={true}
                        onLockIn={() => alert('Locked in!')}
                        onSwitchUp={() => {
                          setInputText('@Spendx switch it up');
                          handleSendMessage();
                        }}
                      />
                    ) : (
                      <div className={`p-3 rounded-2xl ${
                        msg.user === 'Me' 
                          ? 'bg-[var(--lime)] text-black rounded-tr-none' 
                          : msg.isAI
                            ? 'bg-gradient-to-r from-[var(--cyan)] to-[var(--magenta)] text-white rounded-tl-none shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                            : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                      }`}>
                        <p className="text-sm font-medium">{msg.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input Area (Fixed Bottom) */}
      <div className={`absolute bottom-20 left-0 w-full p-4 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)] to-transparent pt-10 ${isMapExpanded ? 'z-[1000] !bottom-0 !p-0 !bg-none' : 'z-40'}`}>
        
        {/* Live Location Strip / Expanded Map */}
        <div 
          className={`relative transition-all duration-500 ease-in-out shrink-0 ${isMapExpanded ? 'h-[100dvh] w-full z-50 fixed inset-0 m-0 rounded-none' : 'h-24 mb-4 rounded-2xl overflow-hidden border border-white/10 cursor-pointer shadow-lg'}`}
          onClick={() => !isMapExpanded && setIsMapExpanded(true)}
        >
          <MapCanvas 
            center={center} 
            zoom={isMapExpanded ? zoom : zoom - 2} 
            layers={{ ...layers, heatmap: false, venues: false, squad: true, user: !ghostMode }}
            ghostMode={ghostMode}
            venueFilter="all"
            isSquadOnly={true} // Always true for the strip/expanded view to hide other UI
            onDropPin={handleDropPin}
            centerTrigger={centerTrigger}
          />
          
          {!isMapExpanded && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 pointer-events-none">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Live Map
              </span>
            </div>
          )}

          {isMapExpanded && (
            <div className="absolute top-6 left-6 z-[1001] pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMapExpanded(false); }}
                className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Chat
              </button>
            </div>
          )}

          {isMapExpanded && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[1001] pointer-events-auto flex flex-col items-center gap-4">
              <button 
                className="bg-[var(--lime)] text-black px-6 py-3 rounded-full font-black text-sm uppercase tracking-tighter shadow-[0_0_20px_rgba(204,255,0,0.4)] flex items-center gap-2 hover:scale-105 transition-transform"
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

        {!isMapExpanded && (
          <>
            {/* Squad Actions Bar */}
          <div className="flex justify-between items-center mb-3 px-2">
            <button 
              onClick={() => setIsMapExpanded(true)}
              className="flex flex-col items-center gap-1 text-white/60 hover:text-[var(--lime)] transition-colors group"
            >
              <div className="p-2 bg-white/5 rounded-full group-hover:bg-[var(--lime)]/10"><MapPin className="w-4 h-4" /></div>
              <span className="text-[8px] font-bold uppercase tracking-widest">Drop Pin</span>
            </button>
            <button 
              onClick={() => alert('Split Bill Modal')}
              className="flex flex-col items-center gap-1 text-white/60 hover:text-[var(--lime)] transition-colors group"
            >
              <div className="p-2 bg-white/5 rounded-full group-hover:bg-[var(--lime)]/10"><Calculator className="w-4 h-4" /></div>
              <span className="text-[8px] font-bold uppercase tracking-widest">Split</span>
            </button>
            <button 
              onClick={() => setGhostMode(!ghostMode)}
              className={`flex flex-col items-center gap-1 transition-colors group ${ghostMode ? 'text-[var(--magenta)]' : 'text-white/60 hover:text-white'}`}
            >
              <div className={`p-2 rounded-full ${ghostMode ? 'bg-[var(--magenta)]/20' : 'bg-white/5 group-hover:bg-white/10'}`}><Ghost className="w-4 h-4" /></div>
              <span className="text-[8px] font-bold uppercase tracking-widest">Ghost</span>
            </button>
            <button 
              onClick={handleInvite}
              className="flex flex-col items-center gap-1 text-white/60 hover:text-[var(--cyan)] transition-colors group"
            >
              <div className="p-2 bg-white/5 rounded-full group-hover:bg-[var(--cyan)]/10"><Link className="w-4 h-4" /></div>
              <span className="text-[8px] font-bold uppercase tracking-widest">Invite</span>
            </button>
          </div>

          {/* Chat Input */}
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
            <button className="p-2 text-white/40 hover:text-[var(--cyan)] transition-colors" onClick={() => setInputText('@spendx ')}>
              <Zap className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Message squad or @spendx..." 
              className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2"
            />
            <button 
              onClick={handleSendMessage}
              className={`p-2 rounded-xl transition-all ${inputText.trim() ? 'bg-[var(--lime)] text-black' : 'text-white/20'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
};
