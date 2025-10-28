import { RideDetailModal } from '../RideDetailModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Ride } from '../RideCard';
import type { Comment } from '../CommentsList';

export default function RideDetailModalExample() {
  const [open, setOpen] = useState(false);

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

  const mockComments: Comment[] = [
    {
      id: "1",
      author: { name: "Sarah Chen" },
      content: "Can't wait for this ride! The weather looks perfect.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>View Ride Details</Button>
      <RideDetailModal
        ride={mockRide}
        open={open}
        onClose={() => setOpen(false)}
        comments={mockComments}
        onAddComment={(content) => console.log('Comment:', content)}
      />
    </div>
  );
}
