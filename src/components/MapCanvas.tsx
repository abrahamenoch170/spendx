import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
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
import { RouteOverlay } from './RouteOverlay';
import { PinDrop } from './PinDrop';
import { SquadLines } from './SquadLines';
import { useTheme } from '../hooks/useTheme';

const MapUpdater = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
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
  venueFilter = 'all'
}: {
  center: [number, number],
  zoom: number,
  layers: ReturnType<typeof useLayers>['layers'],
  ghostMode: boolean,
  venueFilter?: string
}) {
  const { squad } = useSquad(center);
  const { venues } = useVenues(center);
  const { theme } = useTheme();

  const filteredVenues = venueFilter === 'all' ? venues : venues.filter(v => v.type === venueFilter);
  const heatmapPoints = filteredVenues.map(v => [v.lat, v.lng, v.vibe / 100] as [number, number, number]);

  // Generate a mock route from user to a venue
  const routePoints: [number, number][] = filteredVenues.length > 0 ? [
    [center[0] - 0.01, center[1] - 0.01],
    [center[0] - 0.005, center[1] + 0.005],
    [filteredVenues[0].lat, filteredVenues[0].lng]
  ] : [];

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
        doubleClickZoom={false}
        touchZoom={false}
        scrollWheelZoom={false}
        dragging={false}
        keyboard={false}
      >
        <MapUpdater center={center} zoom={zoom} />
        
        <TileLayer
          key={theme} // Force re-render on theme change
          url={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {layers.heatmap && <HeatmapLayer points={heatmapPoints} />}
        
        {layers.venues && (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={50}
            disableClusteringAtZoom={15}
          >
            {filteredVenues.map(venue => <VenueMarker key={venue.id} venue={venue} />)}
          </MarkerClusterGroup>
        )}

        {layers.squad && squad.map(member => <SquadDot key={member.id} member={member} />)}
        {layers.squad && <SquadLines squad={squad} center={[center[0] - 0.01, center[1] - 0.01]} />}
        {layers.user && <UserDot position={[center[0] - 0.01, center[1] - 0.01]} ghostMode={ghostMode} />}
        {layers.user && routePoints.length > 0 && <RouteOverlay positions={routePoints} />}
        
        <PinDrop />
      </MapContainer>
    </div>
  );
}
