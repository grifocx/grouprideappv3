import { RideCard, type Ride } from "@/components/RideCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RideDetailModal } from "@/components/RideDetailModal";
import { useState } from "react";
import type { Comment } from "@/components/CommentsList";

export default function MyRidesPage() {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const upcomingRides: Ride[] = [
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
    }
  ];

  const organizedRides: Ride[] = [
    {
      id: "2",
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
    }
  ];

  const mockComments: Comment[] = [];

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">My Rides</h2>
        <p className="text-muted-foreground">Manage your upcoming and organized rides</p>
      </div>

      <Tabs defaultValue="joined" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="joined" data-testid="tab-joined-rides">
            Joined Rides ({upcomingRides.length})
          </TabsTrigger>
          <TabsTrigger value="organized" data-testid="tab-organized-rides">
            Organized by Me ({organizedRides.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="joined" className="space-y-4">
          {upcomingRides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't joined any rides yet.</p>
            </div>
          ) : (
            upcomingRides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                onJoin={(id) => console.log('Already joined:', id)}
                onViewDetails={(id) => setSelectedRide(upcomingRides.find(r => r.id === id) || null)}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="organized" className="space-y-4">
          {organizedRides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't organized any rides yet.</p>
            </div>
          ) : (
            organizedRides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                onJoin={(id) => console.log('Managing ride:', id)}
                onViewDetails={(id) => setSelectedRide(organizedRides.find(r => r.id === id) || null)}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

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
