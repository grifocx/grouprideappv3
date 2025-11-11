import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ride } from "@shared/schema";
import type { ExpandedRide } from "../../../server/recurring-rides";
import { RideCard } from "@/components/RideCard";
import { RideFilters, type RideFiltersState } from "@/components/RideFilters";
import { CreateRideModal } from "@/components/CreateRideModal";
import { RideDetailModal } from "@/components/RideDetailModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Filter, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<RideFiltersState>({
    rideTypes: [],
    difficulties: [],
    distanceRange: [0, 200],
    availableDays: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const FiltersSidebar = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          {!isMobile && <CreateRideModal />}
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
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-80 border-r p-6 overflow-y-auto">
          <FiltersSidebar />
        </aside>
      )}

      {/* Mobile Filter Sheet */}
      {isMobile && (
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetContent side="left" className="w-[85vw] sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters & Search</SheetTitle>
              <SheetDescription>
                Filter rides by type, difficulty, and distance
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FiltersSidebar />
            </div>
          </SheetContent>
        </Sheet>
      )}

      <main className="flex-1 overflow-y-auto relative">
        <div className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">Discover Rides</h1>
              {isMobile && <CreateRideModal />}
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
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

        {/* Mobile Filter FAB */}
        {isMobile && (
          <Button
            size="icon"
            className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40"
            onClick={() => setFiltersOpen(true)}
            data-testid="button-open-filters"
            aria-label="Open filters"
          >
            <Filter className="h-6 w-6" />
          </Button>
        )}
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
