import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMapStore } from '../../store/mapStore';
import { MapControls } from './MapControls';
import { BottomSheet } from './BottomSheet';
import { VenueBottomSheet } from './VenueBottomSheet';
import { SquadRouteHUD } from './SquadRouteHUD';
import { FloatingSearchBar } from './FloatingSearchBar';
import { FilterDrawer } from './FilterDrawer';
import { EmergencyInfoCard } from './EmergencyInfoCard';

const redIcon = L.divIcon({
  html: '<div class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">+</div>',
  className: 'custom-marker',
  iconSize: [24, 24],
});

export const MapTab = () => {
  const { venues, squadLocations, setSelectedVenue, mapFilters, mapLayers, emergencyLocations, setSelectedEmergency } = useMapStore();
  const [position, setPosition] = useState<[number, number]>([6.5244, 3.3792]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(mapFilters.searchTerm.toLowerCase());
      const matchesCategory = mapFilters.categories.length === 0 || mapFilters.categories.includes(v.type.toLowerCase());
      const matchesRating = (v.rating || 0) >= mapFilters.rating;
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [venues, mapFilters]);

  return (
    <div className="relative h-full w-full bg-[#050505]">
      <FloatingSearchBar onOpenFilters={() => setIsDrawerOpen(true)} />
      <FilterDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <EmergencyInfoCard />
      
      <MapContainer center={position} zoom={15} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {mapLayers.venues && filteredVenues.map(v => (
          <Marker 
            key={v.id} 
            position={[v.lat, v.lng]} 
            eventHandlers={{ click: () => setSelectedVenue(v) }}
          />
        ))}
        {mapLayers.emergency && emergencyLocations.map(e => (
          <Marker 
            key={e.id} 
            position={[e.lat, e.lng]} 
            icon={redIcon}
            eventHandlers={{ click: () => setSelectedEmergency(e) }}
          />
        ))}
        <SquadRouteHUD />
      </MapContainer>
      <MapControls />
      <BottomSheet />
      <VenueBottomSheet />
    </div>
  );
};
