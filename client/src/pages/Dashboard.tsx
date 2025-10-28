import { useState } from "react";
import { RideCard, type Ride } from "@/components/RideCard";
import { RideFilters, type RideFiltersState } from "@/components/RideFilters";
import { CreateRideModal } from "@/components/CreateRideModal";
import { RideDetailModal } from "@/components/RideDetailModal";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Comment } from "@/components/CommentsList";

export default function Dashboard() {
  const [filters, setFilters] = useState<RideFiltersState>({
    rideTypes: [],
    difficulties: [],
    distanceRange: [0, 100],
    availableDays: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const mockRides: Ride[] = [
    {
      id: "1",
      title: "Saturday Morning Trail Shred",
      type: "MTB",
      date: new Date(2025, 10, 2),
      time: "8:00 AM",
      location: "Redwood Regional Park",
      distance: 15,
      difficulty: "Intermediate",
      pace: "Moderate",
      participants: [
        { name: "Emma Wilson" },
        { name: "Carlos Rodriguez" },
        { name: "Maya Patel" }
      ],
      maxParticipants: 8,
      organizer: { name: "Jake Thompson" },
      terrain: "Singletrack"
    },
    {
      id: "2",
      title: "Sunday Road Century",
      type: "Road",
      date: new Date(2025, 10, 3),
      time: "7:00 AM",
      location: "Golden Gate Bridge",
      distance: 100,
      difficulty: "Advanced",
      pace: "Fast",
      participants: [
        { name: "Sophie Anderson" },
        { name: "James Lee" },
        { name: "Rachel Kim" },
        { name: "Tom Brady" }
      ],
      maxParticipants: 12,
      organizer: { name: "Lisa Martinez" },
      terrain: "Paved"
    },
    {
      id: "3",
      title: "Gravel Grind Adventure",
      type: "Gravel",
      date: new Date(2025, 10, 4),
      time: "9:00 AM",
      location: "Mount Tamalpais",
      distance: 35,
      difficulty: "Expert",
      pace: "Challenging",
      participants: [
        { name: "Alex Cooper" },
        { name: "Dana White" }
      ],
      maxParticipants: 6,
      organizer: { name: "Chris Evans" },
      terrain: "Mixed"
    },
    {
      id: "4",
      title: "Easy Neighborhood Cruise",
      type: "Road",
      date: new Date(2025, 10, 5),
      time: "5:30 PM",
      location: "Berkeley Marina",
      distance: 10,
      difficulty: "Beginner",
      pace: "Casual",
      participants: [
        { name: "Nina Patel" }
      ],
      maxParticipants: 10,
      organizer: { name: "Sam Johnson" },
      terrain: "Flat"
    },
  ];

  const mockComments: Comment[] = [
    {
      id: "1",
      author: { name: "Sarah Chen" },
      content: "Can't wait for this ride! The weather looks perfect.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "2",
      author: { name: "Mike Torres" },
      content: "Is there a water stop planned halfway? I'll bring extra bottles if needed.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    }
  ];

  const filteredRides = mockRides.filter(ride => {
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
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex gap-6 p-6">
        <aside className="w-80 flex-shrink-0 overflow-y-auto">
          <RideFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClear={() => setFilters({
              rideTypes: [],
              difficulties: [],
              distanceRange: [0, 100],
              availableDays: [],
            })}
          />
        </aside>

        <main className="flex-1 flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px] max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search rides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-rides"
                />
              </div>
            </div>
            <CreateRideModal onCreateRide={(ride) => console.log('Creating ride:', ride)} />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-1">Discover Rides</h2>
            <p className="text-muted-foreground mb-6">
              Found {filteredRides.length} ride{filteredRides.length !== 1 ? 's' : ''}
            </p>

            <div className="grid gap-4">
              {filteredRides.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onJoin={(id) => console.log('Joining ride:', id)}
                  onViewDetails={(id) => setSelectedRide(mockRides.find(r => r.id === id) || null)}
                />
              ))}
            </div>

            {filteredRides.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No rides match your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <RideDetailModal
        ride={selectedRide}
        open={!!selectedRide}
        onClose={() => setSelectedRide(null)}
        onJoin={(id) => console.log('Joining ride:', id)}
        comments={mockComments}
        onAddComment={(content) => console.log('Adding comment:', content)}
      />
    </div>
  );
}
