import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { useAppStore } from '../../store/appStore';
import QRCode from 'react-qr-code';
import { Download, Video } from 'lucide-react';

export const RecapGenerator = () => {
  const { user, totalCost, plans } = useAppStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const isGold = user.tier === 'gold';

  const downloadCard = async () => {
    if (cardRef.current) {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = 'recap-card.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const downloadMotion = () => {
    alert('Motion graphic download placeholder. Future upgrade!');
  };

  return (
    <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 mt-6">
      <h2 className="text-xl font-light mb-6">Recap</h2>
      
      <div ref={cardRef} className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] p-8 rounded-3xl border border-white/10 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${user.avatarSeed}`} className="w-12 h-12 rounded-full" alt="Avatar" />
          <div>
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-xs text-white/50">{plans[0]?.name || 'Trip'}</p>
          </div>
        </div>
        <div className="text-4xl font-black mb-2">${totalCost.toFixed(2)}</div>
        <p className="text-sm text-white/50 mb-6">Total Cost</p>
        
        {isGold && (
          <div className="bg-white p-2 rounded-xl inline-block">
            <QRCode size={64} value={JSON.stringify({ userId: user.id, trip: plans[0]?.name })} />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button onClick={downloadCard} className="flex-1 p-4 rounded-xl bg-[#CCFF00] text-black font-bold flex items-center justify-center gap-2">
          <Download size={16} /> Download PNG
        </button>
        <button onClick={downloadMotion} className="flex-1 p-4 rounded-xl border border-white/10 flex items-center justify-center gap-2">
          <Video size={16} /> Download MP4
        </button>
      </div>
    </div>
  );
};
