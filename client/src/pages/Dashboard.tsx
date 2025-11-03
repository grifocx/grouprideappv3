import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ride } from "@shared/schema";
import type { ExpandedRide } from "../../../server/recurring-rides";
import { RideCard } from "@/components/RideCard";
import { RideFilters, type RideFiltersState } from "@/components/RideFilters";
import { CreateRideModal } from "@/components/CreateRideModal";
import { RideDetailModal } from "@/components/RideDetailModal";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [filters, setFilters] = useState<RideFiltersState>({
    rideTypes: [],
    difficulties: [],
    distanceRange: [0, 200],
    availableDays: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const { data: rides = [], isLoading } = useQuery<Ride[]>({
    queryKey: ["/api/rides"],
  });

  const filteredRides = rides.filter((ride) => {
    if (filters.rideTypes.length > 0 && !filters.rideTypes.includes(ride.type)) {
      return false;
    }
    if (filters.difficulties.length > 0 && !filters.difficulties.includes(ride.difficulty)) {
      return false;
    }
    if (ride.distance < filters.distanceRange[0] || ride.distance > filters.distanceRange[1]) {
      return false;
    }
    if (searchQuery && !ride.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex h-full">
      <aside className="w-80 border-r p-6 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <CreateRideModal />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rides..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-rides"
            />
          </div>
        </div>

        <RideFilters 
          filters={filters} 
          onFiltersChange={setFilters}
          onClear={() => setFilters({
            rideTypes: [],
            difficulties: [],
            distanceRange: [0, 200],
            availableDays: [],
          })}
        />
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Discover Rides</h1>
            <p className="text-muted-foreground">
              {filteredRides.length} {filteredRides.length === 1 ? "ride" : "rides"} available
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-border" />
            </div>
          ) : filteredRides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No rides found</p>
              {rides.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Be the first to create a ride!
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredRides.map((ride) => {
                const expandedRide = ride as ExpandedRide;
                const uniqueKey = expandedRide.instanceId || ride.id;
                return (
                  <RideCard
                    key={uniqueKey}
                    ride={ride}
                    onClick={() => setSelectedRide(ride)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>

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
