import { create } from 'zustand';

interface Venue {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'food' | 'culture' | 'nature' | 'nightlife' | 'hidden' | string;
  status: 'open' | 'closing' | 'closed' | 'unavailable' | string;
  address?: string;
  description?: string;
  rating?: number;
  vibe?: number;
}

interface SquadMember {
  id: string;
  username: string;
  lat: number;
  lng: number;
  lastUpdate: number; // timestamp
  isGhost: boolean;
}

interface MapStore {
  activeMode: string;
  venues: Venue[];
  squadLocations: SquadMember[];
  routes: any[];
  nearbyFriends: SquadMember[];
  selectedVenue: Venue | null;
  squadNearby: SquadMember[];
  actionStates: Record<string, boolean>;
  emergencyLayerActive: boolean;
  selectedCity: string;
  setVenues: (venues: Venue[]) => void;
  setSquadLocations: (locations: SquadMember[]) => void;
  setNearbyFriends: (friends: SquadMember[]) => void;
  setSelectedVenue: (venue: Venue | null) => void;
  setSquadNearby: (squad: SquadMember[]) => void;
  setActionState: (action: string, state: boolean) => void;
  setEmergencyLayerActive: (active: boolean) => void;
  setSelectedCity: (city: string) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  activeMode: 'group',
  venues: [
    { id: 'v1', name: 'The Burger Joint', lat: 6.5244, lng: 3.3792, type: 'food', status: 'open', address: '123 Main St', description: 'Best burgers in town.', rating: 4.5 },
    { id: 'v2', name: 'Art Gallery', lat: 6.5250, lng: 3.3800, type: 'culture', status: 'closing', address: '456 Art Ave', description: 'Modern art gallery.', rating: 4.8 },
  ],
  squadLocations: [
    { id: 's1', username: 'Alex', lat: 6.5240, lng: 3.3780, lastUpdate: Date.now() - 60000, isGhost: false },
  ],
  routes: [],
  nearbyFriends: [],
  selectedVenue: null,
  squadNearby: [],
  actionStates: {},
  emergencyLayerActive: false,
  selectedCity: 'Lagos',
  setVenues: (venues) => set({ venues }),
  setSquadLocations: (squadLocations) => set({ squadLocations }),
  setNearbyFriends: (nearbyFriends) => set({ nearbyFriends }),
  setSelectedVenue: (selectedVenue) => set({ selectedVenue }),
  setSquadNearby: (squadNearby) => set({ squadNearby }),
  setActionState: (action, state) => set((prev) => ({ actionStates: { ...prev.actionStates, [action]: state } })),
  setEmergencyLayerActive: (emergencyLayerActive) => set({ emergencyLayerActive }),
  setSelectedCity: (selectedCity) => set({ selectedCity }),
}));
