import React from 'react';
import { Polyline, Tooltip } from 'react-leaflet';

const BRAND_COLORS = ['#CCFF00', '#FF00FF', '#00FFFF', '#FF3366', '#00FF99'];

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
      {squad.map((member, index) => {
        const dist = getDistance(center[0], center[1], member.lat, member.lng);
        const midLat = (center[0] + member.lat) / 2;
        const midLng = (center[1] + member.lng) / 2;
        const color = BRAND_COLORS[index % BRAND_COLORS.length];

        return (
          <React.Fragment key={member.id}>
            <Polyline
              positions={[center, [member.lat, member.lng]]}
              pathOptions={{
                color: color,
                weight: 3,
                dashArray: '8, 8',
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
            <Tooltip
              position={[midLat, midLng]}
              permanent
              direction="center"
              className="squad-distance-tooltip"
            >
              <div style={{ color: '#000', backgroundColor: color, padding: '2px 6px', borderRadius: '12px', fontWeight: 'bold', fontSize: '10px', border: '1px solid rgba(0,0,0,0.2)' }}>
                {dist}
              </div>
            </Tooltip>
          </React.Fragment>
        );
      })}
    </>
  );
}
