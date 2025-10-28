import { MapView } from "@/components/MapView";
import { RideDetailModal } from "@/components/RideDetailModal";
import { useState } from "react";
import type { Ride } from "@/components/RideCard";
import type { Comment } from "@/components/CommentsList";

export default function MapPage() {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const mockLocations = [
    { id: "1", title: "Saturday Morning Trail Shred", lat: 37.82, lng: -122.15, type: "MTB" as const },
    { id: "2", title: "Sunday Road Century", lat: 37.81, lng: -122.48, type: "Road" as const },
    { id: "3", title: "Gravel Grind Adventure", lat: 37.90, lng: -122.58, type: "Gravel" as const },
    { id: "4", title: "Easy Neighborhood Cruise", lat: 37.87, lng: -122.31, type: "Road" as const },
  ];

  const mockRides: Record<string, Ride> = {
    "1": {
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
  };

  const mockComments: Comment[] = [
    {
      id: "1",
      author: { name: "Sarah Chen" },
      content: "Can't wait for this ride!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Map View</h2>
        <p className="text-muted-foreground">Explore rides near you</p>
      </div>

      <MapView
        locations={mockLocations}
        onLocationClick={(id) => {
          const ride = mockRides[id];
          if (ride) setSelectedRide(ride);
        }}
      />

      <RideDetailModal
        ride={selectedRide}
        open={!!selectedRide}
        onClose={() => setSelectedRide(null)}
        comments={mockComments}
        onAddComment={(content) => console.log('Adding comment:', content)}
      />
    </div>
  );
}
