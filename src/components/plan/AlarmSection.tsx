import React, { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { AddAlarmModal } from './AddAlarmModal';

export const AlarmSection = () => {
  const { alarms, toggleAlarm, deleteAlarm } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-light">Alarms</h2>
        <button onClick={() => setIsModalOpen(true)} className="p-2 bg-white/5 rounded-full border border-white/10">
          <Plus size={20} />
        </button>
      </div>
      <div className="space-y-3">
        {alarms.map(alarm => (
          <div key={alarm.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <Clock className="text-[#CCFF00]" />
              <div>
                <p className="font-medium">{alarm.description}</p>
                <p className="text-xs text-white/50">{alarm.date} • {alarm.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleAlarm(alarm.id)}
                className={`w-12 h-6 rounded-full transition-colors ${alarm.enabled ? 'bg-[#CCFF00]' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${alarm.enabled ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
              <button onClick={() => deleteAlarm(alarm.id)} className="text-white/30 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <AddAlarmModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
