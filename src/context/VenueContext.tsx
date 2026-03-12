import React, { createContext, useContext, useState } from 'react';
import { Venue } from '../hooks/useVenues';

interface VenueContextType {
  selectedVenue: Venue | null;
  setSelectedVenue: (venue: Venue | null) => void;
}

const VenueContext = createContext<VenueContextType | undefined>(undefined);

export function VenueProvider({ children }: { children: React.ReactNode }) {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  return (
    <VenueContext.Provider value={{ selectedVenue, setSelectedVenue }}>
      {children}
    </VenueContext.Provider>
  );
}

export function useVenueContext() {
  const context = useContext(VenueContext);
  if (context === undefined) {
    throw new Error('useVenueContext must be used within a VenueProvider');
  }
  return context;
}
