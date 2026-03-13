import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Navigation, ThumbsUp, ThumbsDown, Utensils, Beer, Music, Car, Ticket } from 'lucide-react';

interface Stop {
  id: string;
  name: string;
  category: 'food' | 'drink' | 'club' | 'activity';
  cost: string;
  time: string;
  affiliates: ('uber' | 'resy' | 'ubereats' | 'dice')[];
}

interface ItineraryCardProps {
  title: string;
  stops: Stop[];
  budget: string;
  totalTime: string;
  distance: string;
  isSquad?: boolean;
  onLockIn: () => void;
  onSwitchUp: () => void;
}

const CategoryIcon = ({ category }: { category: Stop['category'] }) => {
  switch (category) {
    case 'food': return <Utensils className="w-4 h-4" />;
    case 'drink': return <Beer className="w-4 h-4" />;
    case 'club': return <Music className="w-4 h-4" />;
    case 'activity': return <Ticket className="w-4 h-4" />;
    default: return <MapPin className="w-4 h-4" />;
  }
};

const AffiliateIcon: React.FC<{ type: string, venue: string }> = ({ type, venue }) => {
  const handleClick = () => {
    alert(`Redirecting to ${type} for ${venue}`);
  };

  const getIcon = () => {
    switch (type) {
      case 'uber': return <Car className="w-3 h-3" />;
      case 'resy': return <Utensils className="w-3 h-3" />;
      case 'ubereats': return <Utensils className="w-3 h-3" />;
      case 'dice': return <Ticket className="w-3 h-3" />;
      default: return <Navigation className="w-3 h-3" />;
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="p-1.5 bg-white/5 rounded-md hover:bg-white/10 transition-colors flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-white/60"
    >
      {getIcon()}
      {type}
    </button>
  );
};

export const ItineraryCard: React.FC<ItineraryCardProps> = ({
  title,
  stops,
  budget,
  totalTime,
  distance,
  isSquad = false,
  onLockIn,
  onSwitchUp
}) => {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null);

  const handleVote = (type: 'up' | 'down') => {
    if (hasVoted === type) return;
    
    if (type === 'up') {
      setUpvotes(prev => prev + 1);
      if (hasVoted === 'down') setDownvotes(prev => prev - 1);
    } else {
      setDownvotes(prev => prev + 1);
      if (hasVoted === 'up') setUpvotes(prev => prev - 1);
    }
    setHasVoted(type);
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl overflow-hidden w-full max-w-sm my-2">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-gradient-to-r from-black/40 to-transparent">
        <h3 className="font-black text-lg flex items-center gap-2">
          {title}
        </h3>
      </div>

      {/* Timeline */}
      <div className="p-4 relative">
        <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-white/10 border-l border-dashed border-white/20" />
        
        <div className="space-y-6">
          {stops.map((stop, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={stop.id} 
              className="flex gap-4 relative z-10"
            >
              <div className="flex flex-col items-center mt-1">
                <div className="w-4 h-4 rounded-full bg-[var(--lime)] shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm">{stop.name}</h4>
                  <span className="text-[10px] font-bold text-[var(--lime)]">{stop.time}</span>
                </div>
                
                <div className="flex items-center gap-3 text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">
                  <span className="flex items-center gap-1"><CategoryIcon category={stop.category} /> {stop.category}</span>
                  <span>•</span>
                  <span>{stop.cost}</span>
                </div>

                {stop.affiliates.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {stop.affiliates.map(aff => (
                      <AffiliateIcon key={aff} type={aff} venue={stop.name} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-3 bg-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/60">
        <div className="flex items-center gap-1"><Utensils className="w-3 h-3" /> {budget}</div>
        <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {totalTime}</div>
        <div className="flex items-center gap-1"><Navigation className="w-3 h-3" /> {distance}</div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <button 
            onClick={onLockIn}
            className="flex-1 py-3 bg-[var(--lime)] text-black rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform"
          >
            Lock this in
          </button>
          <button 
            onClick={onSwitchUp}
            className="flex-1 py-3 border border-[var(--cyan)] text-[var(--cyan)] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[var(--cyan)]/10 transition-colors"
          >
            Switch it up
          </button>
        </div>

        {/* Voting (Squad Only) */}
        {isSquad && (
          <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/5">
            <button 
              onClick={() => handleVote('up')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${hasVoted === 'up' ? 'bg-[var(--lime)]/20 text-[var(--lime)]' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="font-bold text-sm">{upvotes}</span>
            </button>
            <button 
              onClick={() => handleVote('down')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${hasVoted === 'down' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span className="font-bold text-sm">{downvotes}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
