import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSquad } from '../hooks/useSquad';
import { useVenues, Venue } from '../hooks/useVenues';
import { SquadCard } from './SquadCard';
import { VenueCard } from './VenueCard';
import { Sparkles, X, MapPin, Clock, DollarSign, Star, Share2, ExternalLink, Navigation, Calendar, Plus, ShoppingBag } from 'lucide-react';
import { useVenueContext } from '../context/VenueContext';
import { useTab } from '../context/TabContext';

export function BottomSheet({ center, venueFilter = 'all' }: { center: [number, number], venueFilter?: string }) {
  const [sheetState, setSheetState] = useState<'collapsed' | 'half' | 'full'>('collapsed');
  const { squad } = useSquad(center);
  const { venues } = useVenues(center);
  const { selectedVenue, setSelectedVenue } = useVenueContext();
  const { setActiveTab } = useTab();

  const filteredVenues = venueFilter === 'all' ? venues : venues.filter(v => v.type === venueFilter);

  useEffect(() => {
    if (selectedVenue) {
      setSheetState('half');
    }
  }, [selectedVenue]);

  const getSheetHeight = () => {
    if (selectedVenue && sheetState === 'collapsed') return '50vh'; // Don't collapse fully if venue selected
    switch (sheetState) {
      case 'collapsed': return '15vh';
      case 'half': return '50vh';
      case 'full': return '90vh';
      default: return '15vh';
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const y = info.offset.y;
    const velocity = info.velocity.y;

    if (y < -50 || velocity < -500) {
      if (sheetState === 'collapsed') setSheetState('half');
      else if (sheetState === 'half') setSheetState('full');
    } else if (y > 50 || velocity > 500) {
      if (sheetState === 'full') setSheetState('half');
      else if (sheetState === 'half') {
        if (selectedVenue) {
          // If venue selected, maybe just stay at half or close venue?
          // Let's say dragging down at half closes the venue selection
          setSelectedVenue(null);
          setSheetState('collapsed');
        } else {
          setSheetState('collapsed');
        }
      }
    }
  };

  const handleAffiliateClick = async (platform: string) => {
    if (!selectedVenue) return;
    try {
      const response = await fetch('/api/affiliates/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          venue_id: selectedVenue.id,
          user_id: 'user_123', // Mock user ID
        })
      });
      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Failed to generate affiliate link:", error);
    }
  };

  const handleAddToSpendx = () => {
    // In a real app, we'd add this venue to the plan state
    console.log("Adding to spendx:", selectedVenue?.name);
    setActiveTab('plan');
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full bg-[var(--card-bg)]/80 backdrop-blur-xl border-t border-[var(--border-color)] rounded-t-[2rem] z-50 flex flex-col overflow-hidden will-change-transform shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
      initial={{ height: '15vh' }}
      animate={{ height: getSheetHeight() }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {/* Drag Handle */}
      <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing relative">
        <div className="w-12 h-1.5 bg-[var(--text-secondary)]/30 rounded-full"></div>
        {selectedVenue && (
          <button 
            onClick={() => setSelectedVenue(null)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex-1 overflow-y-auto hide-scrollbar">
        <AnimatePresence mode="wait">
          {selectedVenue ? (
            <motion.div
              key="venue-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6"
            >
              {/* Image Carousel Mock */}
              <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="min-w-[280px] h-48 rounded-2xl bg-[var(--border-color)] overflow-hidden shrink-0">
                    <img 
                      src={`https://picsum.photos/seed/venue-${selectedVenue.id}-${i}/600/400`} 
                      alt="Venue" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Header Info */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-display font-bold text-3xl text-[var(--text-primary)]">{selectedVenue.name}</h2>
                  <div className="bg-[var(--lime)] text-black font-black px-3 py-1 rounded-lg text-lg">
                    {selectedVenue.vibe}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 rounded-md bg-[var(--border-color)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-wider">
                    {selectedVenue.type}
                  </span>
                  <div className="flex items-center gap-1 text-[var(--lime)] text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    Busy now
                  </div>
                  <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                    <DollarSign className="w-3 h-3" />
                    <DollarSign className="w-3 h-3" />
                    <DollarSign className="w-3 h-3 opacity-30" />
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--border-color)]/30 rounded-2xl p-4">
                  <div className="text-[var(--text-secondary)] text-xs font-bold uppercase mb-1">Spendxes here</div>
                  <div className="text-[var(--text-primary)] font-display font-bold text-xl">124</div>
                </div>
                <div className="bg-[var(--border-color)]/30 rounded-2xl p-4">
                  <div className="text-[var(--text-secondary)] text-xs font-bold uppercase mb-1">Avg group spend</div>
                  <div className="text-[var(--text-primary)] font-display font-bold text-xl">$42</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleAffiliateClick('uber')}
                    className="flex items-center justify-center gap-2 bg-[var(--text-primary)] text-[var(--bg-color)] font-bold py-4 rounded-2xl"
                  >
                    <Navigation className="w-5 h-5" />
                    Get there
                  </button>
                  <button 
                    onClick={() => handleAffiliateClick('resy')}
                    className="flex items-center justify-center gap-2 bg-[var(--magenta)] text-white font-bold py-4 rounded-2xl"
                  >
                    <Calendar className="w-5 h-5" />
                    Book table
                  </button>
                </div>
                <button 
                  onClick={handleAddToSpendx}
                  className="flex items-center justify-center gap-2 bg-[var(--lime)] text-black font-bold py-4 rounded-2xl"
                >
                  <Plus className="w-5 h-5" />
                  Add to spendx
                </button>
              </div>

              {/* Delivery Row */}
              <div className="bg-[var(--border-color)]/20 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[var(--cyan)]" />
                  <span className="font-bold text-[var(--text-primary)]">Order delivery</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAffiliateClick('ubereats')} className="px-3 py-1 rounded-lg bg-[var(--border-color)] text-xs font-bold">UberEats</button>
                  <button onClick={() => handleAffiliateClick('doordash')} className="px-3 py-1 rounded-lg bg-[var(--border-color)] text-xs font-bold">DoorDash</button>
                </div>
              </div>

              {/* Info Strip */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">123 Main St, London SE1 7PB</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Open until 2:00 AM</span>
                </div>
              </div>

              {/* Reviews Strip Mock */}
              <div>
                <h3 className="font-bold text-[var(--text-primary)] mb-3">What people are saying</h3>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="min-w-[240px] bg-[var(--border-color)]/20 rounded-2xl p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= 4 ? 'fill-[var(--lime)] text-[var(--lime)]' : 'text-[var(--text-secondary)]'}`} />)}
                      </div>
                      <p className="text-sm text-[var(--text-primary)] line-clamp-2 italic">"The vibe here is unmatched on a Friday night. Definitely coming back!"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Button */}
              <button className="flex items-center justify-center gap-2 text-[var(--text-secondary)] font-bold py-4">
                <Share2 className="w-5 h-5" />
                Share this spot
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Collapsed View Summary */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1">
                  <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">Tonight's Vibe</h2>
                  <p className="text-sm text-[var(--text-secondary)] font-mono mt-1">{squad.length} squad active • {venues.filter(v => v.status === 'open').length} spots open</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--magenta)]/20 border border-[var(--magenta)] flex items-center justify-center text-xl shrink-0" style={{ boxShadow: '0 0 15px var(--magenta)' }}>
                  🔥
                </div>
              </div>

              {/* Expanded Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: sheetState !== 'collapsed' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {/* AI Suggestion */}
                <div className="bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--cyan)]/20 blur-2xl rounded-full pointer-events-none" />
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[var(--cyan)]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--cyan)]">AI Suggestion</span>
                  </div>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-4 relative z-10">
                    {squad.length} of you are near this area. Start with rooftop drinks at {venues[0]?.name || 'a nearby spot'}, then head to {venues[1]?.name || 'a club'} after 11pm.
                  </p>
                  <button className="w-full bg-[var(--lime)] text-black font-bold py-3 rounded-xl hover:bg-[var(--lime)]/90 transition-colors relative z-10">
                    Plan it
                  </button>
                </div>

                {/* Squad Section */}
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">Squad</h3>
                  <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                    {squad.map(member => (
                      <SquadCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>

                {/* Venues Section */}
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">Trending Nearby</h3>
                  <div className="flex flex-col gap-3">
                    {filteredVenues.map(venue => (
                      <VenueCard key={venue.id} venue={venue} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
