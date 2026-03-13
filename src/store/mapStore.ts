import { create } from 'zustand';

interface Venue {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'food' | 'culture' | 'nature' | 'nightlife' | 'hidden';
  status: 'open' | 'closing' | 'closed' | 'unavailable';
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
  setVenues: (venues: Venue[]) => void;
  setSquadLocations: (locations: SquadMember[]) => void;
  setNearbyFriends: (friends: SquadMember[]) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  activeMode: 'group',
  venues: [
    { id: 'v1', name: 'The Burger Joint', lat: 6.5244, lng: 3.3792, type: 'food', status: 'open' },
    { id: 'v2', name: 'Art Gallery', lat: 6.5250, lng: 3.3800, type: 'culture', status: 'closing' },
  ],
  squadLocations: [
    { id: 's1', username: 'Alex', lat: 6.5240, lng: 3.3780, lastUpdate: Date.now() - 60000, isGhost: false },
  ],
  routes: [],
  nearbyFriends: [],
  setVenues: (venues) => set({ venues }),
  setSquadLocations: (squadLocations) => set({ squadLocations }),
  setNearbyFriends: (nearbyFriends) => set({ nearbyFriends }),
}));
