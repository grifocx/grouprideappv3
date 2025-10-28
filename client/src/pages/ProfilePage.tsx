import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserAvatar } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Bike, Award, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    club: "Bay Area Cyclists",
    location: "San Francisco, CA",
    rideTypes: ["MTB", "Road"],
    difficulties: ["Intermediate", "Advanced"],
    preferredDays: ["Sat", "Sun"],
  });

  const stats = {
    totalRides: 47,
    totalDistance: 1250,
    organizedRides: 12,
  };

  const rideTypes = ["MTB", "Road", "Gravel"];
  const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const togglePreference = (category: 'rideTypes' | 'difficulties' | 'preferredDays', value: string) => {
    const current = profile[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setProfile({ ...profile, [category]: updated });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Profile</h2>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <UserAvatar name={profile.name} size="lg" />
              <div>
                <CardTitle className="text-xl">{profile.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                <Bike className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Rides</p>
                  <p className="text-2xl font-bold">{stats.totalRides}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Miles</p>
                  <p className="text-2xl font-bold">{stats.totalDistance}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                <Award className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Organized</p>
                  <p className="text-2xl font-bold">{stats.organizedRides}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="club">Club Affiliation</Label>
                <Input
                  id="club"
                  value={profile.club}
                  onChange={(e) => setProfile({ ...profile, club: e.target.value })}
                  data-testid="input-club"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  data-testid="input-location"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ride Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Preferred Ride Types</Label>
              <div className="flex flex-wrap gap-2">
                {rideTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={profile.rideTypes.includes(type) ? "default" : "outline"}
                    className="cursor-pointer hover-elevate"
                    onClick={() => togglePreference('rideTypes', type)}
                    data-testid={`badge-type-${type.toLowerCase()}`}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Difficulty Levels</Label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Badge
                    key={difficulty}
                    variant={profile.difficulties.includes(difficulty) ? "default" : "outline"}
                    className="cursor-pointer hover-elevate"
                    onClick={() => togglePreference('difficulties', difficulty)}
                    data-testid={`badge-difficulty-${difficulty.toLowerCase()}`}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Available Days</Label>
              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <Button
                    key={day}
                    variant={profile.preferredDays.includes(day) ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePreference('preferredDays', day)}
                    className="text-xs"
                    data-testid={`button-pref-day-${day.toLowerCase()}`}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button data-testid="button-save-preferences">
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
