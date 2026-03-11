import React from 'react';
import { Polyline } from 'react-leaflet';

export function RouteOverlay({ positions }: { positions: [number, number][] }) {
  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#555555',
          weight: 4,
          opacity: 0.5,
          dashArray: '10, 10',
        }}
      />
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#FF0099',
          weight: 4,
          opacity: 1,
          dashArray: '20, 20',
          className: 'animate-dash-move',
        }}
      />
    </>
  );
}
