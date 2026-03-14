import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents, Polyline, CircleMarker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { useMapState } from '../hooks/useMapState';
import { useSquad } from '../hooks/useSquad';
import { useVenues } from '../hooks/useVenues';
import { useLayers } from '../hooks/useLayers';
import { HeatmapLayer } from './HeatmapLayer';
import { VenueMarker } from './VenueMarker';
import { SquadDot } from './SquadDot';
import { UserDot } from './UserDot';
import { PinDrop } from './PinDrop';
import { SquadLines } from './SquadLines';
import { useTheme } from '../hooks/useTheme';
import { FriendMarker } from './FriendMarker';
import { toast } from 'react-hot-toast';
import { useMapStore } from '../store/mapStore';

const MapUpdater = ({ center, zoom, isSquadOnly, squad, centerTrigger }: { center: [number, number], zoom: number, isSquadOnly?: boolean, squad?: any[], centerTrigger?: number }) => {
  const map = useMap();

  useEffect(() => {
    if (isSquadOnly && squad && squad.length > 0) {
      const group = L.featureGroup(squad.map(m => L.marker([m.lat, m.lng])));
      map.fitBounds(group.getBounds().pad(0.2));
    } else if (!isSquadOnly) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map, isSquadOnly, squad, centerTrigger]);

  return null;
};

const MapEvents = ({ onDropPin, isSquadOnly }: { onDropPin?: (loc: string) => void, isSquadOnly?: boolean }) => {
  const map = useMapEvents({
    contextmenu: (e) => {
      if (!isSquadOnly || !onDropPin) return;
      const { lat, lng } = e.latlng;
      onDropPin(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      L.popup()
        .setLatLng(e.latlng)
        .setContent('<div class="p-2 font-bold text-xs uppercase tracking-widest">📍 Pin dropped for squad</div>')
        .openOn(map);
    },
  });
  return null;
};

const createClusterCustomIcon = function (cluster: any) {
  return L.divIcon({
    html: `<div class="w-12 h-12 rounded-full bg-[var(--card-bg)] border-[3px] border-[var(--lime)] flex items-center justify-center text-[var(--text-primary)] font-bold shadow-lg animate-pop-in"><span>${cluster.getChildCount()}</span></div>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(48, 48, true),
  });
};

export function MapCanvas({
  center,
  zoom,
  layers,
  ghostMode,
  venueFilter = 'all',
  isSquadOnly = false,
  onDropPin,
  centerTrigger
}: {
  center: [number, number],
  zoom: number,
  layers: ReturnType<typeof useLayers>['layers'],
  ghostMode: boolean,
  venueFilter?: string,
  isSquadOnly?: boolean,
  onDropPin?: (loc: string) => void,
  centerTrigger?: number
}) {
  const { squad } = useSquad(center);
  const { venues, actionStates } = useMapStore();
  const { theme } = useTheme();
  const redCarpetEnabled = actionStates['red-carpet'] || false;

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3; // metres
    const phi1 = lat1 * Math.PI/180;
    const phi2 = lat2 * Math.PI/180;
    const deltaPhi = (lat2-lat1) * Math.PI/180;
    const deltaLambda = (lng2-lng1) * Math.PI/180;
    const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  const handlePing = (name: string) => {
    toast.success(`Ping sent to ${name}!`);
  };

  const filteredVenues = venueFilter === 'all' ? venues : venues.filter(v => v.type === venueFilter);
  const heatmapPoints = filteredVenues.map(v => [v.lat, v.lng, (v.vibe || 0) / 100] as [number, number, number]);

  const tileUrl = theme === 'dark' 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="w-full h-full"
        doubleClickZoom={isSquadOnly}
        touchZoom={isSquadOnly}
        scrollWheelZoom={isSquadOnly}
        dragging={isSquadOnly}
        keyboard={isSquadOnly}
      >
        <MapUpdater center={center} zoom={zoom} isSquadOnly={isSquadOnly} squad={squad} centerTrigger={centerTrigger} />
        <MapEvents onDropPin={onDropPin} isSquadOnly={isSquadOnly} />
        
        <TileLayer
          key={theme} // Force re-render on theme change
          url={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {!isSquadOnly && layers.includes('heatmap') && <HeatmapLayer points={heatmapPoints} />}
        
        {!isSquadOnly && layers.includes('venues') && (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={50}
            disableClusteringAtZoom={15}
          >
            {filteredVenues.map(venue => <VenueMarker key={venue.id} venue={venue} />)}
          </MarkerClusterGroup>
        )}

        {layers.includes('squad') && squad.map(member => {
          const dist = getDistance(center[0], center[1], member.lat, member.lng);
          if (dist < 100 && !ghostMode) {
            return <FriendMarker key={member.id} member={member} onPing={handlePing} />;
          }
          return <SquadDot key={member.id} member={member} />;
        })}
        {layers.includes('squad') && <SquadLines squad={squad} center={[center[0] - 0.01, center[1] - 0.01]} />}
        {layers.includes('user') && <UserDot position={[center[0] - 0.01, center[1] - 0.01]} ghostMode={ghostMode} />}
        
        {!isSquadOnly && redCarpetEnabled && (
          <>
            <Polyline positions={[center, [center[0] + 0.005, center[1] + 0.005]]} color="gold" dashArray="10, 10" />
            <CircleMarker center={[center[0] + 0.005, center[1] + 0.005]} radius={10} color="gold" fillColor="gold" fillOpacity={0.5} />
          </>
        )}

        {!isSquadOnly && <PinDrop />}
      </MapContainer>
    </div>
  );
}
