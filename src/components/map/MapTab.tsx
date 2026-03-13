import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { useMapStore } from '../../store/mapStore';
import { MapControls } from './MapControls';
import { BottomSheet } from './BottomSheet';

export const MapTab = () => {
  const { venues, squadLocations } = useMapStore();
  const [position, setPosition] = useState<[number, number]>([6.5244, 3.3792]);

  return (
    <div className="relative h-full w-full bg-[#050505]">
      <MapContainer center={position} zoom={15} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {venues.map(v => (
          <Marker key={v.id} position={[v.lat, v.lng]} />
        ))}
        {squadLocations.map(s => (
          <Marker key={s.id} position={[s.lat, s.lng]} />
        ))}
      </MapContainer>
      <MapControls />
      <BottomSheet />
    </div>
  );
};
