import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MapLocation {
  id: string;
  title: string;
  lat: number;
  lng: number;
  type: "MTB" | "Road" | "Gravel";
}

interface MapViewProps {
  locations: MapLocation[];
  onLocationClick?: (id: string) => void;
  center?: [number, number];
}

export function MapView({ locations, onLocationClick, center = [37.8, -122.4] }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined' || !(window as any).L) return;

    const L = (window as any).L;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      setIsMapReady(true);
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current) return;

    const L = (window as any).L;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const typeColors: Record<string, string> = {
      MTB: '#B7CF4F',
      Road: '#1A00A9',
      Gravel: '#FF5E33',
    };

    locations.forEach((location) => {
      const color = typeColors[location.type] || '#1A00A9';
      
      const marker = L.circleMarker([location.lat, location.lng], {
        radius: 10,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      });

      marker.bindPopup(`
        <div style="font-family: 'JetBrains Mono', monospace; min-width: 150px;">
          <strong style="font-size: 14px;">${location.title}</strong><br/>
          <span style="font-size: 12px; color: #666;">${location.type}</span>
        </div>
      `);

      marker.on('click', () => {
        onLocationClick?.(location.id);
      });

      marker.addTo(mapInstanceRef.current);
      markersRef.current.push(marker);
    });
  }, [locations, isMapReady, onLocationClick]);

  const centerOnUser = () => {
    if (!mapInstanceRef.current) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapInstanceRef.current.setView([latitude, longitude], 13);
      },
      (error) => {
        console.log('Geolocation error:', error);
      }
    );
  };

  return (
    <Card className="relative overflow-hidden" data-testid="map-view">
      <div ref={mapRef} className="w-full h-[600px]" />
      
      <Button
        size="icon"
        className="absolute bottom-4 right-4 shadow-lg"
        onClick={centerOnUser}
        data-testid="button-center-map"
      >
        <Navigation className="h-5 w-5" />
      </Button>

      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm p-3 rounded-lg shadow-lg">
        <div className="flex flex-col gap-2 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B7CF4F' }} />
            <span>MTB</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#1A00A9' }} />
            <span>Road</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E33' }} />
            <span>Gravel</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
