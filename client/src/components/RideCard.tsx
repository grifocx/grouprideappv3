import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { Calendar, Clock, MapPin, TrendingUp, Users } from "lucide-react";
import { format } from "date-fns";

export interface Ride {
  id: string;
  title: string;
  type: "MTB" | "Road" | "Gravel";
  date: Date;
  time: string;
  location: string;
  distance: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  pace: string;
  participants: { name: string; image?: string }[];
  maxParticipants: number;
  organizer: { name: string; image?: string };
  terrain: string;
}

interface RideCardProps {
  ride: Ride;
  onJoin?: (rideId: string) => void;
  onViewDetails?: (rideId: string) => void;
}

export function RideCard({ ride, onJoin, onViewDetails }: RideCardProps) {
  const difficultyColors = {
    Beginner: "bg-chart-3 text-foreground",
    Intermediate: "bg-chart-2 text-accent-foreground",
    Advanced: "bg-accent text-accent-foreground",
    Expert: "bg-primary text-primary-foreground",
  };

  const typeIcons = {
    MTB: "🚵",
    Road: "🚴",
    Gravel: "🚴‍♂️",
  };

  const spotsLeft = ride.maxParticipants - ride.participants.length;

  return (
    <Card className="hover-elevate" data-testid={`card-ride-${ride.id}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-semibold">
                {typeIcons[ride.type]} {ride.type}
              </Badge>
              <Badge className={`text-xs font-semibold ${difficultyColors[ride.difficulty]}`}>
                {ride.difficulty}
              </Badge>
            </div>
            <h3 className="font-bold text-lg mb-1 truncate" data-testid={`text-ride-title-${ride.id}`}>
              {ride.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="text-xs">by</span>
              <UserAvatar name={ride.organizer.name} size="sm" />
              <span className="font-medium truncate">{ride.organizer.name}</span>
            </div>
          </div>
          <Button
            size="default"
            onClick={() => onJoin?.(ride.id)}
            data-testid={`button-join-${ride.id}`}
          >
            Join Ride
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{format(ride.date, "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{ride.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium truncate">{ride.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{ride.distance} mi • {ride.pace}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {ride.participants.slice(0, 3).map((participant, i) => (
                <UserAvatar
                  key={i}
                  name={participant.name}
                  image={participant.image}
                  size="sm"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {ride.participants.length} / {ride.maxParticipants}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails?.(ride.id)}
            data-testid={`button-view-details-${ride.id}`}
          >
            View Details
          </Button>
        </div>

        {spotsLeft <= 3 && spotsLeft > 0 && (
          <Badge variant="outline" className="w-full justify-center text-xs bg-accent/20">
            Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left!
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
