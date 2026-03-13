import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMapStore } from '../../store/mapStore';
import { MapControls } from './MapControls';
import { BottomSheet } from './BottomSheet';
import { VenueBottomSheet } from './VenueBottomSheet';
import { SquadRouteHUD } from './SquadRouteHUD';

export const MapTab = () => {
  const { venues, squadLocations, setSelectedVenue } = useMapStore();
  const [position, setPosition] = useState<[number, number]>([6.5244, 3.3792]);

  return (
    <div className="relative h-full w-full bg-[#050505]">
      <MapContainer center={position} zoom={15} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {venues.map(v => (
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
