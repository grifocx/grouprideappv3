import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Loader2, Repeat } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { geocodeAddress } from "@/lib/geocoding";

export function CreateRideModal() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    city: "",
    state: "",
    zipCode: "",
    distance: "",
    difficulty: "",
    pace: "",
    terrain: "",
    maxParticipants: "",
    description: "",
    isRecurring: false,
    recurrencePattern: "",
    recurrenceDayOfWeek: "",
    recurrenceEndDate: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/rides", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/my-rides"] });
      toast({
        title: "Success",
        description: "Ride created successfully",
      });
      setOpen(false);
      setFormData({
        title: "",
        type: "",
        date: "",
        time: "",
        city: "",
        state: "",
        zipCode: "",
        distance: "",
        difficulty: "",
        pace: "",
        terrain: "",
        maxParticipants: "",
        description: "",
        isRecurring: false,
        recurrencePattern: "",
        recurrenceDayOfWeek: "",
        recurrenceEndDate: "",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create ride",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsGeocoding(true);
    const coordinates = await geocodeAddress(
      formData.city,
      formData.state,
      formData.zipCode
    );
    setIsGeocoding(false);

    if (!coordinates) {
      toast({
        title: "Geocoding Failed",
        description: "Could not find coordinates for the provided address. Please check the city and state.",
        variant: "destructive",
      });
      return;
    }

    const submitData: any = {
      ...formData,
      date: new Date(formData.date),
      distance: parseInt(formData.distance),
      maxParticipants: parseInt(formData.maxParticipants),
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };

    if (formData.isRecurring) {
      submitData.isRecurring = true;
      submitData.recurrencePattern = formData.recurrencePattern || null;
      submitData.recurrenceDayOfWeek = formData.recurrenceDayOfWeek ? parseInt(formData.recurrenceDayOfWeek) : null;
      submitData.recurrenceEndDate = formData.recurrenceEndDate ? new Date(formData.recurrenceEndDate) : null;
    } else {
      submitData.isRecurring = false;
      submitData.recurrencePattern = null;
      submitData.recurrenceDayOfWeek = null;
      submitData.recurrenceEndDate = null;
    }

    createMutation.mutate(submitData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="default" data-testid="button-create-ride">
          <Plus className="h-5 w-5 mr-2" />
          Create Ride
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Ride</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Ride Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Saturday Morning Trail Ride"
                required
                data-testid="input-ride-title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Ride Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger data-testid="select-ride-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MTB">MTB</SelectItem>
                    <SelectItem value="Road">Road</SelectItem>
                    <SelectItem value="Gravel">Gravel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                  <SelectTrigger data-testid="select-difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pace">Pace</Label>
                <Select value={formData.pace} onValueChange={(value) => setFormData({ ...formData, pace: value })}>
                  <SelectTrigger data-testid="select-pace">
                    <SelectValue placeholder="Select pace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Leisurely">Leisurely</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Brisk">Brisk</SelectItem>
                    <SelectItem value="Fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="terrain">Terrain</Label>
                <Select value={formData.terrain} onValueChange={(value) => setFormData({ ...formData, terrain: value })}>
                  <SelectTrigger data-testid="select-terrain">
                    <SelectValue placeholder="Select terrain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Flat">Flat</SelectItem>
                    <SelectItem value="Rolling">Rolling</SelectItem>
                    <SelectItem value="Hilly">Hilly</SelectItem>
                    <SelectItem value="Mountainous">Mountainous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  data-testid="input-date"
                />
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  data-testid="input-time"
                />
              </div>
            </div>

            <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-primary" />
                  <div>
                    <Label htmlFor="isRecurring" className="cursor-pointer">Recurring Ride</Label>
                    <p className="text-xs text-muted-foreground">This ride repeats on a schedule</p>
                  </div>
                </div>
                <Switch
                  id="isRecurring"
                  checked={formData.isRecurring}
                  onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked })}
                  data-testid="switch-recurring"
                />
              </div>

              {formData.isRecurring && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recurrencePattern">Frequency</Label>
                      <Select
                        value={formData.recurrencePattern}
                        onValueChange={(value) => setFormData({ ...formData, recurrencePattern: value })}
                      >
                        <SelectTrigger data-testid="select-recurrence-pattern">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Biweekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(formData.recurrencePattern === "weekly" || formData.recurrencePattern === "biweekly") && (
                      <div>
                        <Label htmlFor="recurrenceDayOfWeek">Day of Week</Label>
                        <Select
                          value={formData.recurrenceDayOfWeek}
                          onValueChange={(value) => setFormData({ ...formData, recurrenceDayOfWeek: value })}
                        >
                          <SelectTrigger data-testid="select-day-of-week">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Sunday</SelectItem>
                            <SelectItem value="1">Monday</SelectItem>
                            <SelectItem value="2">Tuesday</SelectItem>
                            <SelectItem value="3">Wednesday</SelectItem>
                            <SelectItem value="4">Thursday</SelectItem>
                            <SelectItem value="5">Friday</SelectItem>
                            <SelectItem value="6">Saturday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="recurrenceEndDate">End Date (Optional)</Label>
                    <Input
                      id="recurrenceEndDate"
                      type="date"
                      value={formData.recurrenceEndDate}
                      onChange={(e) => setFormData({ ...formData, recurrenceEndDate: e.target.value })}
                      data-testid="input-recurrence-end-date"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave blank to repeat indefinitely (up to 90 days ahead)
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Meeting Location</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City (e.g., Oakland)"
                  required
                  data-testid="input-city"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State (CA)"
                    required
                    data-testid="input-state"
                    maxLength={2}
                  />
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="ZIP"
                    data-testid="input-zip"
                    maxLength={5}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the city and state where riders should meet. ZIP code is optional but helps with accuracy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="distance">Distance (mi)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  placeholder="50"
                  required
                  data-testid="input-distance"
                />
              </div>

              <div>
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  placeholder="10"
                  required
                  data-testid="input-max-participants"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add route details, stops, what to bring..."
                className="resize-none"
                rows={3}
                data-testid="textarea-description"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createMutation.isPending || isGeocoding}
              data-testid="button-cancel-create"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || isGeocoding}
              data-testid="button-submit-ride"
            >
              {isGeocoding ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Finding location...
                </>
              ) : createMutation.isPending ? (
                "Creating..."
              ) : (
                "Create Ride"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
