import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ride } from "@shared/schema";
import { RideCard } from "@/components/RideCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RideDetailModal } from "@/components/RideDetailModal";
import { Loader2, Users, Calendar } from "lucide-react";

export default function MyRidesPage() {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const { data: organizedRides = [], isLoading: isLoadingOrganized } = useQuery<Ride[]>({
    queryKey: ["/api/my-rides"],
  });

  const { data: joinedRides = [], isLoading: isLoadingJoined } = useQuery<Ride[]>({
    queryKey: ["/api/joined-rides"],
  });

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">My Rides</h2>
        <p className="text-muted-foreground">Manage your rides and participation</p>
      </div>

      <Tabs defaultValue="organized" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2" data-testid="tabs-my-rides">
          <TabsTrigger value="organized" className="flex items-center gap-2" data-testid="tab-organized">
            <Calendar className="h-4 w-4" />
            Organized ({organizedRides.length})
          </TabsTrigger>
          <TabsTrigger value="joined" className="flex items-center gap-2" data-testid="tab-joined">
            <Users className="h-4 w-4" />
            Joined ({joinedRides.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organized" className="mt-6">
          {isLoadingOrganized ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-border" />
            </div>
          ) : organizedRides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">You haven't organized any rides yet</p>
              <p className="text-sm text-muted-foreground">
                Create your first ride from the Discover page
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {organizedRides.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onClick={() => setSelectedRide(ride)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="joined" className="mt-6">
          {isLoadingJoined ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-border" />
            </div>
          ) : joinedRides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">You haven't joined any rides yet</p>
              <p className="text-sm text-muted-foreground">
                Browse available rides from the Discover page
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {joinedRides.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onClick={() => setSelectedRide(ride)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

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
