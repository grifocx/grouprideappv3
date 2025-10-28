import { RideCard, type Ride } from '../RideCard';

export default function RideCardExample() {
  const mockRide: Ride = {
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
  };

  return (
    <div className="p-4 max-w-2xl">
      <RideCard
        ride={mockRide}
        onJoin={(id) => console.log('Join ride:', id)}
        onViewDetails={(id) => console.log('View details:', id)}
      />
    </div>
  );
}
