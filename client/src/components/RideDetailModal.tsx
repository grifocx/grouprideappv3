import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, TrendingUp, Mountain, Users } from "lucide-react";
import { format } from "date-fns";
import { Ride } from "@shared/schema";

interface RideDetailModalProps {
  ride: Ride | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RideDetailModal({
  ride,
  open,
  onOpenChange,
}: RideDetailModalProps) {
  if (!ride) return null;

  const difficultyColors: Record<string, string> = {
    Beginner: "bg-chart-3 text-foreground",
    Intermediate: "bg-chart-2 text-accent-foreground",
    Advanced: "bg-accent text-accent-foreground",
    Expert: "bg-primary text-primary-foreground",
  };

  const formatLocation = () => {
    const parts = [ride.city, ride.state];
    if (ride.zipCode) parts.push(ride.zipCode);
    return parts.join(", ");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge variant="outline" className="text-xs font-semibold">
                  {ride.type}
                </Badge>
                <Badge className={`text-xs font-semibold ${difficultyColors[ride.difficulty] || "bg-secondary"}`}>
                  {ride.difficulty}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {ride.terrain}
                </Badge>
              </div>
              <DialogTitle className="text-2xl mb-2">{ride.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-semibold">{format(new Date(ride.date), "EEEE, MMM dd, yyyy")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Start Time</p>
                <p className="font-semibold">{ride.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted col-span-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold">{formatLocation()}</p>
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

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted col-span-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Max Participants</p>
                <p className="font-semibold">{ride.maxParticipants} riders</p>
              </div>
            </div>
          </div>

          {ride.description && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{ride.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
