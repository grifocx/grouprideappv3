import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "./UserAvatar";
import { CommentsList, type Comment } from "./CommentsList";
import { Calendar, Clock, MapPin, TrendingUp, Users, Mountain } from "lucide-react";
import { format } from "date-fns";
import type { Ride } from "./RideCard";

interface RideDetailModalProps {
  ride: Ride | null;
  open: boolean;
  onClose: () => void;
  onJoin?: (rideId: string) => void;
  comments?: Comment[];
  onAddComment?: (content: string) => void;
}

export function RideDetailModal({
  ride,
  open,
  onClose,
  onJoin,
  comments = [],
  onAddComment,
}: RideDetailModalProps) {
  if (!ride) return null;

  const difficultyColors = {
    Beginner: "bg-chart-3 text-foreground",
    Intermediate: "bg-chart-2 text-accent-foreground",
    Advanced: "bg-accent text-accent-foreground",
    Expert: "bg-primary text-primary-foreground",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs font-semibold">
                  {ride.type}
                </Badge>
                <Badge className={`text-xs font-semibold ${difficultyColors[ride.difficulty]}`}>
                  {ride.difficulty}
                </Badge>
              </div>
              <DialogTitle className="text-2xl mb-2">{ride.title}</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Organized by</span>
                <UserAvatar name={ride.organizer.name} size="sm" />
                <span className="font-medium">{ride.organizer.name}</span>
              </div>
            </div>
            <Button
              size="default"
              onClick={() => onJoin?.(ride.id)}
              data-testid="button-join-ride-detail"
            >
              Join Ride
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-semibold">{format(ride.date, "EEEE, MMM dd, yyyy")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Start Time</p>
                <p className="font-semibold">{ride.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold">{ride.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Distance & Pace</p>
                <p className="font-semibold">{ride.distance} mi • {ride.pace}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Mountain className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Terrain</p>
                <p className="font-semibold">{ride.terrain}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Participants</p>
                <p className="font-semibold">
                  {ride.participants.length} / {ride.maxParticipants} riders
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Participants</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted border-2 border-primary/20">
                <UserAvatar name={ride.organizer.name} size="sm" />
                <div>
                  <p className="text-sm font-semibold">{ride.organizer.name}</p>
                  <p className="text-xs text-muted-foreground">Organizer</p>
                </div>
              </div>
              {ride.participants.map((participant, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted"
                  data-testid={`participant-${i}`}
                >
                  <UserAvatar name={participant.name} image={participant.image} size="sm" />
                  <p className="text-sm font-medium">{participant.name}</p>
                </div>
              ))}
            </div>
          </div>

          <CommentsList comments={comments} onAddComment={onAddComment} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
