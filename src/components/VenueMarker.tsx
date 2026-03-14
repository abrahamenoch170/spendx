import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { renderToString } from 'react-dom/server';

export const VenueMarker = ({ venue, onClick }: any) => {
  const iconHtml = renderToString(
    <motion.div
      initial={{ scale: 0, y: -20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-10 h-10 rounded-full bg-[var(--electric-cyan)] border-2 border-white flex items-center justify-center shadow-lg"
    >
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${venue.id}`} alt={venue.name} className="w-8 h-8" />
    </motion.div>
  );

  const icon = L.divIcon({
    html: iconHtml,
    className: 'custom-venue-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return <Marker position={[venue.lat, venue.lng]} icon={icon} eventHandlers={{ click: onClick }} />;
};
