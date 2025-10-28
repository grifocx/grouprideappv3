import { RideCard, type Ride } from "@/components/RideCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const completedRides: Ride[] = [
    {
      id: "past-1",
      title: "Epic Mountain Climb",
      type: "MTB",
      date: new Date(2025, 9, 15),
      time: "7:00 AM",
      location: "Mount Diablo",
      distance: 25,
      difficulty: "Advanced",
      pace: "Challenging",
      participants: [
        { name: "Alex Rivera" },
        { name: "Jordan Smith" },
        { name: "Taylor Brown" },
        { name: "Casey Jones" }
      ],
      maxParticipants: 6,
      organizer: { name: "Morgan Lee" },
      terrain: "Mountain"
    },
    {
      id: "past-2",
      title: "Coastal Road Tour",
      type: "Road",
      date: new Date(2025, 9, 8),
      time: "8:30 AM",
      location: "Highway 1",
      distance: 60,
      difficulty: "Intermediate",
      pace: "Moderate",
      participants: [
        { name: "Riley Davis" },
        { name: "Skyler Martinez" }
      ],
      maxParticipants: 8,
      organizer: { name: "Cameron White" },
      terrain: "Rolling"
    }
  ];

  const filteredRides = completedRides.filter(ride =>
    ride.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Archive</h2>
        <p className="text-muted-foreground">Browse completed rides</p>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search archived rides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-archive"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            onViewDetails={(id) => console.log('View archived ride:', id)}
          />
        ))}
      </div>

      {filteredRides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No archived rides found.</p>
        </div>
      )}
    </div>
  );
}
