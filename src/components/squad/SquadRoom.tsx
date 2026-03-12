'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Settings, MapPin, Calculator, Ghost, Share2, Send, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// Mock AI client - in production this would be initialized with the API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const SquadRoom = ({ squadId, squadName, onBack }: { squadId: string, squadName: string, onBack: () => void }) => {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', sender: 'Other', text: 'Hey everyone, ready for tonight?', timestamp: '10:00 AM' },
  ]);
  const [input, setInput] = useState('');
  const [ghostMode, setGhostMode] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newUserMessage = { id: Date.now().toString(), sender: 'You', text: input, timestamp: 'Now' };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    if (input.includes('@Spendx')) {
      // Trigger AI
      const aiResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: "You are a helpful squad planning assistant. Help the group find consensus. Suggest itineraries.",
        },
      });
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        sender: 'AI', 
        text: aiResponse.text || 'I am ready to help!', 
        timestamp: 'Now' 
      }]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)]">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
        <button onClick={onBack}><ArrowLeft /></button>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2].map(i => <div key={i} className="w-8 h-8 rounded-full bg-[var(--border-color)] border-2 border-[var(--bg-color)]" />)}
          </div>
          <h2 className="font-bold">{squadName}</h2>
        </div>
        <Settings />
      </div>

      {/* Live Location Strip */}
      <div className="h-24 bg-[var(--card-bg)] border-b border-[var(--border-color)] p-2">
        <div className="w-full h-full bg-[var(--border-color)] rounded-xl flex items-center justify-center text-[var(--text-secondary)]">
          Map Placeholder
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'AI' && <div className="w-8 h-8 rounded-full bg-[var(--cyan)] mr-2 flex items-center justify-center"><Bot className="w-5 h-5 text-black" /></div>}
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'You' ? 'bg-[var(--lime)] text-black' : msg.sender === 'AI' ? 'bg-[#1A1A1A] text-white border border-[var(--cyan)]' : 'bg-[#333] text-white'}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex justify-around p-2 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
        <button><MapPin /></button>
        <button><Calculator /></button>
        <button onClick={() => setGhostMode(!ghostMode)} className={ghostMode ? 'text-[var(--cyan)]' : ''}><Ghost /></button>
        <button><Share2 /></button>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border-color)] bg-[var(--card-bg)] flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-[var(--bg-color)] rounded-full px-4 py-2" placeholder="Message..." />
        <button onClick={handleSend} className="p-2 rounded-full bg-[var(--lime)] text-black"><Send /></button>
      </div>
    </div>
  );
};
