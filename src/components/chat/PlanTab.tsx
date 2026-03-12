'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Mic, ArrowRight, MapPin, Zap, X } from 'lucide-react';
import { ItineraryCard } from './ItineraryCard';

const quickPrompts = ["Solo night · $60", "Squad birthday", "Date night", "Daily coffee", "Doctor visit"];

export const PlanTab = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tokens, setTokens] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTokens = localStorage.getItem('tokens');
    if (savedTokens) setTokens(parseInt(savedTokens));
    
    const savedMessages = localStorage.getItem('chat_history');
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    localStorage.setItem('tokens', tokens.toString());
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [tokens, messages]);

  const handleLockIn = async (itinerary: any, totalBudget: string) => {
    try {
      const response = await fetch('/api/spendx/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itinerary, totalBudget, mode: 'squad' })
      });
      const data = await response.json();
      if (data.success) {
        alert(`Spendx locked in! Share link: ${data.shareLink}`);
      }
    } catch (error) {
      console.error('Failed to lock in', error);
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim() || tokens <= 0) return;
    
    const newUserMessage = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setTokens(prev => prev - 1);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const isItinerary = Math.random() > 0.5;
      const itinerary = isItinerary ? {
        routeName: "🌆 Friday Night",
        stops: [
          { name: "Coffee Shop", category: "Cafe", cost: "$5", time: "18:00" },
          { name: "Dinner", category: "Restaurant", cost: "$30", time: "19:30" },
          { name: "Bar", category: "Drinks", cost: "$20", time: "21:00" }
        ],
        totalBudget: "$55",
        totalTime: "3h",
        distance: "2km"
      } : null;

      const newAIMessage = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: isItinerary ? 'Here is a plan for you!' : 'That sounds like a great idea! How else can I help?',
        itinerary
      };
      setMessages(prev => [...prev, newAIMessage]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)]">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b border-[var(--border-color)]">
        <h2 className="text-xl font-bold">Plan</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm font-medium text-[var(--lime)]">
            <Zap className="w-4 h-4" />
            {tokens} tokens
          </div>
          <div className="px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm font-medium">Squad</div>
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-[var(--text-secondary)] mt-10">
            <p>Start planning your next outing!</p>
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-[var(--cyan)] mr-2 flex-shrink-0" />
            )}
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.type === 'user' ? 'bg-[var(--lime)] text-black' : 'bg-[#1A1A1A] text-white border border-[var(--cyan)]'}`}>
              <p>{msg.text}</p>
              {msg.itinerary && <ItineraryCard {...msg.itinerary} onLock={() => handleLockIn(msg.itinerary, msg.itinerary.totalBudget)} />}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-[var(--cyan)]">
            <div className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse delay-150" />
            <span className="text-sm">Spendx is building your route...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[var(--border-color)] bg-[var(--card-bg)] pb-[env(safe-area-inset-bottom)]">
        {tokens <= 0 ? (
          <button onClick={() => setIsModalOpen(true)} className="w-full py-3 rounded-xl bg-[var(--lime)] text-black font-bold">
            Out of tokens – Top up
          </button>
        ) : (
          <>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {quickPrompts.map(prompt => (
                <button key={prompt} onClick={() => handleSend(prompt)} className="whitespace-nowrap px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm">
                  {prompt}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-6 h-6 text-[var(--text-secondary)]" />
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell Spendx what you want to do..."
                className="flex-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full px-4 py-3 focus:outline-none"
              />
              <button onClick={() => handleSend(input)} className="p-3 rounded-full bg-[var(--lime)]">
                <ArrowRight className="w-6 h-6 text-black" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Top-up Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-sm p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4"><X /></button>
              <h2 className="text-xl font-bold mb-4">Get more tokens</h2>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setTokens(prev => prev + 10); setIsModalOpen(false); }} className="py-3 rounded-xl bg-[var(--border-color)]">Watch ad for +10 tokens</button>
                <button onClick={() => { setTokens(prev => prev + 50); setIsModalOpen(false); }} className="py-3 rounded-xl bg-[var(--lime)] text-black font-bold">Buy 50 tokens for $2.99</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
