import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlanStore } from '../../store/planStore';

const PROMPTS = ["Plan a date night", "Find a quiet cafe", "Plan a group dinner", "Suggest a scenic walk"];

export const ChatSection = () => {
  const { chatHistory, addChatMessage } = usePlanStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    addChatMessage({ id: Date.now().toString(), sender: 'user', text: input });
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addChatMessage({ id: (Date.now() + 1).toString(), sender: 'ai', text: 'That sounds like a great idea! Let me help you plan that.' });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chatHistory.map(msg => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl max-w-[80%] ${msg.sender === 'user' ? 'ml-auto bg-[#D4FF00] text-black' : 'mr-auto bg-white/10 text-white border border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.2)]'}`}
          >
            {msg.sender === 'ai' && <img src="https://api.dicebear.com/9.x/bottts/svg?seed=ai" className="w-8 h-8 rounded-full border-2 border-[#00E5FF] mb-2" alt="AI" />}
            {msg.text}
          </motion.div>
        ))}
        {isTyping && <div className="flex gap-1 p-4"><Loader2 className="animate-spin text-[#00E5FF]" /></div>}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {PROMPTS.map(p => <button key={p} className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs whitespace-nowrap" onClick={() => setInput(p)}>{p}</button>)}
      </div>

      <div className="flex gap-2">
        <input className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4" placeholder="Ask Spendx AI..." value={input} onChange={e => setInput(e.target.value)} />
        <button className="bg-[#D4FF00] text-black rounded-full p-4" onClick={sendMessage}><Send /></button>
      </div>
    </div>
  );
};
