import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { GeolocationData } from '@/types';
import { cn } from '@/lib/utils';
import { Map as MapIcon, Layers, Maximize, Target } from 'lucide-react';

// Fix for default marker icons not showing in Vite/React
// @ts-ignore
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapSectionProps {
  locations: GeolocationData[];
  className?: string;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    // Optionally auto-center when a specific event happens
  }, [center, map]);
  return null;
}

export default function MapSection({ locations, className }: MapSectionProps) {
  const [mapType, setMapType] = useState<'streets' | 'dark' | 'satellite'>('dark');
  
  const tileLayers = {
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  const center: [number, number] = locations.length > 0 
    ? [locations[0].lat, locations[0].lng] 
    : [-23.5505, -46.6333]; // São Paulo default

  return (
    <div className={cn("relative rounded-lg overflow-hidden border border-[#1E293B] bg-[#0E0E12] group", className)}>
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <div className="flex bg-[#0E0E12]/80 backdrop-blur-md border border-[#1E293B] rounded p-1 shadow-2xl">
          {(['dark', 'streets', 'satellite'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setMapType(type)}
              className={cn(
                "px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded transition-all",
                mapType === type 
                  ? "bg-[#3B82F6] text-white" 
                  : "text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#1E293B]"
              )}
            >
              {type}
            </button>
          ))}
        </div>
        
        <button className="p-2 bg-[#0E0E12]/80 backdrop-blur-md border border-[#1E293B] rounded text-[#94A3B8] hover:text-[#3B82F6] transition-colors shadow-2xl self-end">
          <Target size={16} />
        </button>
      </div>

      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <div className="bg-[#0E0E12]/90 backdrop-blur-lg border border-[#1E293B] rounded p-5 shadow-2xl pointer-events-auto min-w-[200px]">
          <div className="text-[10px] uppercase tracking-widest text-[#94A3B8] mb-1">Status Ativo</div>
          <div className="text-sm font-serif italic text-[#E2E8F0] mb-4">Rede de Varejo Alpha</div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <div className="text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Monitorados</div>
                <div className="text-xl font-light text-[#E2E8F0]">{locations.length}</div>
             </div>
             <div>
                <div className="text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Qualidade</div>
                <div className="text-xl font-light text-[#3B82F6]">84.2%</div>
             </div>
          </div>
        </div>
      </div>

      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer url={tileLayers[mapType]} />
        <MapUpdater center={center} />
        
        {locations.map((loc) => (
          <div key={loc.id}>
            <Marker position={[loc.lat, loc.lng]}>
              <Popup className="custom-popup">
                <div className="p-2 min-w-[150px] bg-[#0E0E12] text-[#E2E8F0] border-[#1E293B]">
                  <h3 className="font-serif italic text-sm mb-1">{loc.deviceName}</h3>
                  <p className="text-xs text-[#94A3B8] mb-2">{loc.clientId}</p>
                  <div className="flex flex-col gap-1 text-[9px] font-mono text-[#E2E8F0]/70 uppercase">
                    <span>Lat: {loc.lat.toFixed(6)}</span>
                    <span>Lng: {loc.lng.toFixed(6)}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={[loc.lat, loc.lng]} 
              radius={300}
              pathOptions={{ 
                color: loc.status === 'warning' ? '#EF4444' : '#3B82F6', 
                fillColor: loc.status === 'warning' ? '#EF4444' : '#3B82F6',
                fillOpacity: 0.05,
                weight: 1
              }} 
            />
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
