import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Utensils, Coffee, Music, ShoppingBag, TreeDeciduous } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';

export const FilterDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { mapFilters, setMapFilters } = useMapStore();

  const toggleCategory = (cat: string) => {
    const categories = mapFilters.categories.includes(cat)
      ? mapFilters.categories.filter(c => c !== cat)
      : [...mapFilters.categories, cat];
    setMapFilters({ ...mapFilters, categories });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="absolute top-0 left-0 w-[80%] h-full bg-black/90 backdrop-blur-2xl z-50 p-6 border-r border-white/10"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Filters</h2>
            <button onClick={onClose}><X /></button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white/50 mb-3">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Food', 'Drinks', 'Cafe', 'Entertainment', 'Shopping', 'Parks'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => toggleCategory(cat.toLowerCase())}
                    className={`p-2 rounded-lg text-sm ${mapFilters.categories.includes(cat.toLowerCase()) ? 'bg-[var(--acid-lime)] text-black' : 'bg-white/5'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white/50 mb-3">Price Range</h3>
              <input 
                type="range" 
                min="1" max="4" 
                value={mapFilters.priceRange}
                onChange={(e) => setMapFilters({...mapFilters, priceRange: Number(e.target.value)})}
                className="w-full accent-[var(--acid-lime)]"
              />
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white/50">Open Now</h3>
              <input 
                type="checkbox" 
                checked={mapFilters.openNow}
                onChange={(e) => setMapFilters({...mapFilters, openNow: e.target.checked})}
                className="accent-[var(--acid-lime)]"
              />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white/50 mb-3">Rating</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    onClick={() => setMapFilters({...mapFilters, rating: star})}
                    className={`w-6 h-6 cursor-pointer ${mapFilters.rating >= star ? 'text-[var(--acid-lime)] fill-[var(--acid-lime)]' : 'text-white/20'}`}
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-[var(--acid-lime)] text-black rounded-xl font-bold mt-8"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
