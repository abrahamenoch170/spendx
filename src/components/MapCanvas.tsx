import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useMapState } from '../hooks/useMapState';
import { useSquad } from '../hooks/useSquad';
import { useVenues } from '../hooks/useVenues';
import { useLayers } from '../hooks/useLayers';
import { HeatmapLayer } from './HeatmapLayer';
import { VenueMarker } from './VenueMarker';
import { SquadDot } from './SquadDot';
import { UserDot } from './UserDot';
import { RouteOverlay } from './RouteOverlay';
import { PinDrop } from './PinDrop';

const MapUpdater = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export function MapCanvas({
  center,
  zoom,
  layers,
  ghostMode
}: {
  center: [number, number],
  zoom: number,
  layers: ReturnType<typeof useLayers>['layers'],
  ghostMode: boolean
}) {
  const { squad } = useSquad(center);
  const { venues } = useVenues(center);

  const heatmapPoints = venues.map(v => [v.lat, v.lng, v.vibe / 100] as [number, number, number]);

  // Generate a mock route from user to a venue
  const routePoints: [number, number][] = venues.length > 0 ? [
    [center[0] - 0.01, center[1] - 0.01],
    [center[0] - 0.005, center[1] + 0.005],
    [venues[0].lat, venues[0].lng]
  ] : [];

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="w-full h-full"
        doubleClickZoom={false}
        touchZoom={false}
        scrollWheelZoom={false}
        dragging={false}
        keyboard={false}
      >
        <MapUpdater center={center} zoom={zoom} />
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {layers.heatmap && <HeatmapLayer points={heatmapPoints} />}
        {layers.venues && venues.map(venue => <VenueMarker key={venue.id} venue={venue} />)}
        {layers.squad && squad.map(member => <SquadDot key={member.id} member={member} />)}
        {layers.user && <UserDot position={[center[0] - 0.01, center[1] - 0.01]} ghostMode={ghostMode} />}
        {layers.user && routePoints.length > 0 && <RouteOverlay positions={routePoints} />}
        
        <PinDrop />
      </MapContainer>
    </div>
  );
}
