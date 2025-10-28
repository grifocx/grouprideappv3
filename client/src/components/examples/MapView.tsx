import { MapView } from '../MapView';

export default function MapViewExample() {
  const mockLocations = [
    { id: "1", title: "Redwood Regional Park", lat: 37.82, lng: -122.15, type: "MTB" as const },
    { id: "2", title: "Grizzly Peak", lat: 37.87, lng: -122.23, type: "Road" as const },
    { id: "3", title: "Tilden Park Loop", lat: 37.90, lng: -122.24, type: "Gravel" as const },
  ];

  return (
    <div className="p-4">
      <MapView
        locations={mockLocations}
        onLocationClick={(id) => console.log('Clicked location:', id)}
      />
    </div>
  );
}
