import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, TrendingUp, Repeat } from "lucide-react";
import { format } from "date-fns";
import { Ride } from "@shared/schema";

interface RideCardProps {
  ride: Ride;
  onClick?: () => void;
}

export function RideCard({ ride, onClick }: RideCardProps) {
  const difficultyColors = {
    Beginner: "bg-chart-3 text-foreground",
    Intermediate: "bg-chart-2 text-accent-foreground",
    Advanced: "bg-accent text-accent-foreground",
    Expert: "bg-primary text-primary-foreground",
  };

  const typeIcons: Record<string, string> = {
    MTB: "🚵",
    Road: "🚴",
    Gravel: "🚴‍♂️",
  };

  const formatLocation = () => {
    const parts = [ride.city, ride.state];
    if (ride.zipCode) parts.push(ride.zipCode);
    return parts.join(", ");
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer" 
      onClick={onClick}
      data-testid={`card-ride-${ride.id}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className="text-xs font-semibold">
                {typeIcons[ride.type] || "🚴"} {ride.type}
              </Badge>
              <Badge className={`text-xs font-semibold ${difficultyColors[ride.difficulty as keyof typeof difficultyColors] || "bg-secondary"}`}>
                {ride.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {ride.terrain}
              </Badge>
              {ride.isRecurring && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Repeat className="h-3 w-3" />
                  {ride.recurrencePattern === "weekly" ? "Weekly" : 
                   ride.recurrencePattern === "biweekly" ? "Biweekly" : 
                   ride.recurrencePattern === "monthly" ? "Monthly" : "Recurring"}
                </Badge>
              )}
            </div>
            <h3 className="font-bold text-lg mb-1" data-testid={`text-ride-title-${ride.id}`}>
              {ride.title}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{format(new Date(ride.date), "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{ride.time}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium truncate">{formatLocation()}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{ride.distance} mi • {ride.pace}</span>
          </div>
        </div>

        {ride.description && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {ride.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
