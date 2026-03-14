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

export const MapTab = () => {
  const { venues, squadLocations, setSelectedVenue, mapFilters } = useMapStore();
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
      
      <MapContainer center={position} zoom={15} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {filteredVenues.map(v => (
          <Marker 
            key={v.id} 
            position={[v.lat, v.lng]} 
            eventHandlers={{ click: () => setSelectedVenue(v) }}
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
