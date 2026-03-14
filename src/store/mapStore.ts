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

interface Plan {
  id: string;
  title: string;
  venueName: string;
  startTime: Date;
}

interface SquadMember {
  id: string;
  username: string;
  lat: number;
  lng: number;
  lastUpdate: number; // timestamp
  isGhost: boolean;
}

interface EmergencyLocation {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'police' | 'pharmacy';
  lat: number;
  lng: number;
  phone: string;
  address: string;
}

interface MapFilters {
  searchTerm: string;
  categories: string[];
  priceRange: number;
  openNow: boolean;
  rating: number;
  distance: number;
  accessibility: string[];
}

interface MapLayers {
  venues: boolean;
  friends: boolean;
  emergency: boolean;
}

interface MapStore {
  activeMode: string;
  venues: Venue[];
  plans: Plan[];
  mapFilters: MapFilters;
  mapLayers: MapLayers;
  emergencyLocations: EmergencyLocation[];
  squadLocations: SquadMember[];
  routes: any[];
  nearbyFriends: SquadMember[];
  selectedVenue: Venue | null;
  selectedEmergency: EmergencyLocation | null;
  squadNearby: SquadMember[];
  actionStates: Record<string, boolean>;
  emergencyLayerActive: boolean;
  selectedCity: string;
  isSpiderfied: boolean;
  activeClusterId: string | null;
  setVenues: (venues: Venue[]) => void;
  setPlans: (plans: Plan[]) => void;
  setMapFilters: (filters: MapFilters) => void;
  toggleMapLayer: (layer: keyof MapLayers) => void;
  setSquadLocations: (locations: SquadMember[]) => void;
  setNearbyFriends: (friends: SquadMember[]) => void;
  setSelectedVenue: (venue: Venue | null) => void;
  setSelectedEmergency: (emergency: EmergencyLocation | null) => void;
  setSquadNearby: (squad: SquadMember[]) => void;
  setActionState: (action: string, state: boolean) => void;
  setEmergencyLayerActive: (active: boolean) => void;
  setSelectedCity: (city: string) => void;
  setIsSpiderfied: (isSpiderfied: boolean) => void;
  setActiveClusterId: (activeClusterId: string | null) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  activeMode: 'group',
  venues: [
    { id: 'v1', name: 'The Burger Joint', lat: 6.5244, lng: 3.3792, type: 'food', status: 'open', address: '123 Main St', description: 'Best burgers in town.', rating: 4.5 },
    { id: 'v2', name: 'Art Gallery', lat: 6.5250, lng: 3.3800, type: 'culture', status: 'closing', address: '456 Art Ave', description: 'Modern art gallery.', rating: 4.8 },
  ],
  plans: [
    { id: 'p1', title: 'Dinner', venueName: 'The Burger Joint', startTime: new Date(Date.now() + 3600000 * 3) },
    { id: 'p2', title: 'Drinks', venueName: 'Fabric London', startTime: new Date(Date.now() + 3600000 * 6) }
  ],
  mapFilters: {
    searchTerm: "",
    categories: [],
    priceRange: 1,
    openNow: false,
    rating: 0,
    distance: 10,
    accessibility: []
  },
  mapLayers: {
    venues: true,
    friends: true,
    emergency: false
  },
  emergencyLocations: [
    { id: 'e1', name: "City Hospital", type: "hospital", lat: 6.5260, lng: 3.3810, phone: "+234 1 123 4567", address: "1 Hospital Rd" },
    { id: 'e2', name: "Central Police Station", type: "police", lat: 6.5230, lng: 3.3770, phone: "+234 1 987 6543", address: "2 Police St" },
    { id: 'e3', name: "24hr Pharmacy", type: "pharmacy", lat: 6.5255, lng: 3.3785, phone: "+234 1 555 0000", address: "3 Pharmacy Ave" }
  ],
  squadLocations: [
    { id: 's1', username: 'Alex', lat: 6.5240, lng: 3.3780, lastUpdate: Date.now() - 60000, isGhost: false },
  ],
  routes: [],
  nearbyFriends: [],
  selectedVenue: null,
  selectedEmergency: null,
  squadNearby: [],
  actionStates: {},
  emergencyLayerActive: false,
  selectedCity: 'Lagos',
  isSpiderfied: false,
  activeClusterId: null,
  setVenues: (venues) => set({ venues }),
  setPlans: (plans) => set({ plans }),
  setMapFilters: (mapFilters) => set({ mapFilters }),
  toggleMapLayer: (layer) => set((state) => ({
    mapLayers: { ...state.mapLayers, [layer]: !state.mapLayers[layer] }
  })),
  setSquadLocations: (squadLocations) => set({ squadLocations }),
  setNearbyFriends: (nearbyFriends) => set({ nearbyFriends }),
  setSelectedVenue: (selectedVenue) => set({ selectedVenue }),
  setSelectedEmergency: (selectedEmergency) => set({ selectedEmergency }),
  setSquadNearby: (squadNearby) => set({ squadNearby }),
  setActionState: (action, state) => set((prev) => ({ actionStates: { ...prev.actionStates, [action]: state } })),
  setEmergencyLayerActive: (emergencyLayerActive) => set({ emergencyLayerActive }),
  setSelectedCity: (selectedCity) => set({ selectedCity }),
  setIsSpiderfied: (isSpiderfied) => set({ isSpiderfied }),
  setActiveClusterId: (activeClusterId) => set({ activeClusterId }),
}));
