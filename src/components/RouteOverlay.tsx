import React from 'react';
import { Polyline } from 'react-leaflet';

export function RouteOverlay({ positions }: { positions: [number, number][] }) {
  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: 'var(--text-secondary)',
          weight: 3,
          opacity: 0.3,
          dashArray: '10, 10',
        }}
      />
      <Polyline
        positions={positions}
        pathOptions={{
          color: 'var(--lime)',
          weight: 3,
          opacity: 1,
          dashArray: '15, 15',
          className: 'animate-dash-move',
        }}
      />
    </>
  );
}
