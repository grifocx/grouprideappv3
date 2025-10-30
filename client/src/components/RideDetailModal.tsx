import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, TrendingUp, Mountain, Users } from "lucide-react";
import { format } from "date-fns";
import { Ride, RideParticipant } from "@shared/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
  const { data: currentUser } = useQuery({
    queryKey: ["/api/user"],
  });

  const { data: participants = [], isLoading: isLoadingParticipants } = useQuery<RideParticipant[]>({
    queryKey: ["/api/rides", ride?.id, "participants"],
    enabled: !!ride?.id && open,
  });

  const isUserJoined = participants.some(p => p.userId === currentUser?.id);
  const isRideFull = participants.length >= (ride?.maxParticipants || 0);
  const isOrganizer = ride?.organizerId === currentUser?.id;

  const joinMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/rides/${ride!.id}/join`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rides", ride!.id, "participants"] });
      queryClient.invalidateQueries({ queryKey: ["/api/joined-rides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/rides"] });
      toast({
        title: "Success",
        description: "You've joined the ride!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join ride",
        variant: "destructive",
      });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("DELETE", `/api/rides/${ride!.id}/leave`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rides", ride!.id, "participants"] });
      queryClient.invalidateQueries({ queryKey: ["/api/joined-rides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/rides"] });
      toast({
        title: "Success",
        description: "You've left the ride",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to leave ride",
        variant: "destructive",
      });
    },
  });

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
                <p className="text-xs text-muted-foreground">Participants</p>
                <p className="font-semibold" data-testid="text-participant-count">
                  {isLoadingParticipants ? "..." : `${participants.length} / ${ride.maxParticipants}`} riders
                </p>
              </div>
            </div>
          </div>

          {ride.description && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{ride.description}</p>
            </div>
          )}

          {currentUser && !isOrganizer && (
            <div className="pt-4 border-t">
              {isUserJoined ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => leaveMutation.mutate()}
                  disabled={leaveMutation.isPending}
                  data-testid="button-leave-ride"
                >
                  {leaveMutation.isPending ? "Leaving..." : "Leave Ride"}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => joinMutation.mutate()}
                  disabled={joinMutation.isPending || isRideFull}
                  data-testid="button-join-ride"
                >
                  {joinMutation.isPending ? "Joining..." : isRideFull ? "Ride Full" : "Join Ride"}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
