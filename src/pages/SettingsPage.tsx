'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Smartphone, 
  Globe, 
  Eye, 
  EyeOff,
  Trash2,
  LogOut,
  Users,
  MapPin
} from 'lucide-react';

import { useTab } from '../context/TabContext';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { isEnterprise, setIsEnterprise, isStudent, setIsStudent, university, setUniversity } = useTab();

  const sections = [
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', icon: User, value: 'Abraham Enoch' },
        { label: 'Email', icon: Globe, value: 'abraham@spendx.app' },
        { label: 'Phone', icon: Smartphone, value: '+44 7700 900000' },
      ]
    },
    {
      title: 'Student Mode',
      items: [
        { 
          label: 'I\'m a student', 
          icon: Users, 
          type: 'toggle', 
          active: isStudent,
          onToggle: () => setIsStudent(!isStudent)
        },
        ...(isStudent ? [
          { label: 'University', icon: MapPin, value: university, onChange: (val: string) => setUniversity(val) },
        ] : []),
      ]
    },
    {
      title: 'Enterprise',
      items: [
        { 
          label: 'Enterprise Mode', 
          icon: Shield, 
          type: 'toggle', 
          active: isEnterprise,
          onToggle: () => setIsEnterprise(!isEnterprise)
        },
      ]
    },
    {
      title: 'Privacy',
      items: [
        { label: 'Ghost Mode', icon: EyeOff, type: 'toggle', active: false },
        { label: 'Public Profile', icon: Eye, type: 'toggle', active: true },
        { label: 'Data & Privacy', icon: Shield },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { label: 'Push Notifications', icon: Bell, type: 'toggle', active: true },
        { label: 'Email Updates', icon: Globe, type: 'toggle', active: false },
      ]
    },
    {
      title: 'Billing',
      items: [
        { label: 'Subscription', icon: CreditCard, value: 'Premium' },
        { label: 'Payment Methods', icon: CreditCard },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] font-sans pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-color)]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tighter">Settings</h1>
      </div>

      <div className="p-4 space-y-8 max-w-2xl mx-auto">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-2">
              {section.title}
            </h2>
            <div className="bg-[var(--card-bg)] rounded-3xl border border-white/5 overflow-hidden">
              {section.items.map((item, i) => (
                <div 
                  key={item.label}
                  onClick={() => item.onToggle ? item.onToggle() : null}
                  className={`flex items-center justify-between p-4 hover:bg-white/5 transition-colors ${item.onChange ? '' : 'cursor-pointer'} ${
                    i !== section.items.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{item.label}</span>
                      {item.onChange && (
                        <input 
                          type="text" 
                          value={item.value} 
                          onChange={(e) => item.onChange!(e.target.value)}
                          className="bg-transparent text-[10px] text-white/60 outline-none mt-1"
                        />
                      )}
                    </div>
                  </div>
                  
                  {item.type === 'toggle' ? (
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.active ? 'bg-[var(--lime)]' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 bg-black rounded-full transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  ) : !item.onChange && (
                    <div className="flex items-center gap-2">
                      {item.value && <span className="text-xs text-white/40">{item.value}</span>}
                      <ChevronLeft className="w-4 h-4 text-white/20 rotate-180" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-3 pt-4">
          <button className="w-full bg-red-500/10 p-4 rounded-3xl border border-red-500/20 flex items-center gap-4 text-red-500 hover:bg-red-500/20 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm">Log Out</span>
          </button>
          
          <button className="w-full p-4 flex items-center justify-center gap-2 text-white/20 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Delete Account</span>
          </button>
        </div>

        <div className="text-center pt-8">
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Spendx v1.0.42 (Beta)</p>
          <p className="text-[10px] text-white/10 mt-1">Made with 🖤 in London</p>
        </div>
      </div>
    </div>
  );
};
