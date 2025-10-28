import { MapView } from "@/components/MapView";
import { RideDetailModal } from "@/components/RideDetailModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ride } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function MapPage() {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const { data: rides = [], isLoading } = useQuery<Ride[]>({
    queryKey: ["/api/rides"],
  });

  const mapLocations = rides
    .filter((ride) => ride.latitude && ride.longitude)
    .map((ride) => ({
      id: ride.id,
      title: ride.title,
      lat: ride.latitude!,
      lng: ride.longitude!,
      type: ride.type as "MTB" | "Road" | "Gravel",
    }));

  return (
    <div className="flex-1 p-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Map View</h2>
        <p className="text-muted-foreground">Explore rides near you</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      ) : mapLocations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No rides with locations found</p>
          <p className="text-sm text-muted-foreground">
            Create a ride with a city and state to see it on the map
          </p>
        </div>
      ) : (
        <div className="h-[calc(100vh-200px)]">
          <MapView
            locations={mapLocations}
            onLocationClick={(id) => {
              const ride = rides.find((r) => r.id === id);
              if (ride) setSelectedRide(ride);
            }}
          />
        </div>
      )}

      {selectedRide && (
        <RideDetailModal
          ride={selectedRide}
          open={!!selectedRide}
          onOpenChange={(open) => !open && setSelectedRide(null)}
        />
      )}
    </div>
  );
}
