import React from 'react';
import { Polyline, Tooltip } from 'react-leaflet';

export function SquadLines({ squad, center }: { squad: any[], center: [number, number] }) {
  // Haversine distance
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d > 1000 ? `${(d/1000).toFixed(1)}km` : `${Math.round(d)}m`;
  };

  return (
    <>
      {squad.map((member) => {
        const dist = getDistance(center[0], center[1], member.lat, member.lng);
        const midLat = (center[0] + member.lat) / 2;
        const midLng = (center[1] + member.lng) / 2;

        return (
          <React.Fragment key={member.id}>
            <Polyline
              positions={[center, [member.lat, member.lng]]}
              pathOptions={{
                color: 'var(--squad-line-color)',
                weight: 2,
                dashArray: '5, 5',
                opacity: 0.8
              }}
            />
            <Tooltip
              position={[midLat, midLng]}
              permanent
              direction="center"
              className="squad-distance-tooltip"
            >
              {dist}
            </Tooltip>
          </React.Fragment>
        );
      })}
    </>
  );
}
