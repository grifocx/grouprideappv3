import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { UserPreferences, insertUserPreferencesSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserAvatar } from "@/components/UserAvatar";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User as UserIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const rideTypes = ["MTB", "Road", "Gravel"];
const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"];
const paces = ["Leisurely", "Moderate", "Brisk", "Fast"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const terrains = ["Flat", "Rolling", "Hilly", "Mountainous"];

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { data: preferences, isLoading } = useQuery<UserPreferences | null>({
    queryKey: ["/api/preferences"],
    enabled: !!user,
  });

  const [formData, setFormData] = useState<Partial<UserPreferences>>({});

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<UserPreferences>) => {
      const res = await apiRequest("POST", "/api/preferences", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Preferences saved successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save preferences",
        variant: "destructive",
      });
    },
  });

  const startEditing = () => {
    setFormData({
      rideTypes: preferences?.rideTypes || [],
      difficulties: preferences?.difficulties || [],
      paces: preferences?.paces || [],
      terrains: preferences?.terrains || [],
      availableDays: preferences?.availableDays || [],
      clubAffiliation: preferences?.clubAffiliation || "",
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const toggleArrayValue = (field: keyof UserPreferences, value: string) => {
    const currentArray = (formData[field] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    setFormData({ ...formData, [field]: newArray });
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {!isEditing && (
            <Button onClick={startEditing} data-testid="button-edit-profile">
              Edit Preferences
            </Button>
          )}
          {isEditing && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={saveMutation.isPending}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saveMutation.isPending}
                data-testid="button-save"
              >
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <UserAvatar name={user?.username || ""} size="lg" />
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold">{user?.username}</h2>
                <p className="text-sm text-muted-foreground">Cyclist</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ride Preferences</CardTitle>
            <CardDescription>
              Set your riding preferences to help find the perfect group rides
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isEditing ? (
              <>
                <div>
                  <h3 className="font-medium mb-2">Ride Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.rideTypes && preferences.rideTypes.length > 0 ? (
                      preferences.rideTypes.map((type) => (
                        <div key={type} className="px-3 py-1 rounded-md bg-secondary text-sm">
                          {type}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No preferences set</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Difficulty Levels</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.difficulties && preferences.difficulties.length > 0 ? (
                      preferences.difficulties.map((level) => (
                        <div key={level} className="px-3 py-1 rounded-md bg-secondary text-sm">
                          {level}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No preferences set</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Pace</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.paces && preferences.paces.length > 0 ? (
                      preferences.paces.map((pace) => (
                        <div key={pace} className="px-3 py-1 rounded-md bg-secondary text-sm">
                          {pace}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No preferences set</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Terrain</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.terrains && preferences.terrains.length > 0 ? (
                      preferences.terrains.map((terrain) => (
                        <div key={terrain} className="px-3 py-1 rounded-md bg-secondary text-sm">
                          {terrain}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No preferences set</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Available Days</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.availableDays && preferences.availableDays.length > 0 ? (
                      preferences.availableDays.map((day) => (
                        <div key={day} className="px-3 py-1 rounded-md bg-secondary text-sm">
                          {day}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No preferences set</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Club Affiliation</h3>
                  <p className="text-sm">
                    {preferences?.clubAffiliation || (
                      <span className="text-muted-foreground">No club affiliation</span>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <Label>Ride Types</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {rideTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          checked={(formData.rideTypes || []).includes(type)}
                          onCheckedChange={() => toggleArrayValue("rideTypes", type)}
                          data-testid={`checkbox-ridetype-${type.toLowerCase()}`}
                        />
                        <label className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Difficulty Levels</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {difficulties.map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          checked={(formData.difficulties || []).includes(difficulty)}
                          onCheckedChange={() => toggleArrayValue("difficulties", difficulty)}
                          data-testid={`checkbox-difficulty-${difficulty.toLowerCase()}`}
                        />
                        <label className="text-sm">{difficulty}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Pace</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {paces.map((pace) => (
                      <div key={pace} className="flex items-center space-x-2">
                        <Checkbox
                          checked={(formData.paces || []).includes(pace)}
                          onCheckedChange={() => toggleArrayValue("paces", pace)}
                          data-testid={`checkbox-pace-${pace.toLowerCase()}`}
                        />
                        <label className="text-sm">{pace}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Terrain</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {terrains.map((terrain) => (
                      <div key={terrain} className="flex items-center space-x-2">
                        <Checkbox
                          checked={(formData.terrains || []).includes(terrain)}
                          onCheckedChange={() => toggleArrayValue("terrains", terrain)}
                          data-testid={`checkbox-terrain-${terrain.toLowerCase()}`}
                        />
                        <label className="text-sm">{terrain}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Available Days</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {days.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          checked={(formData.availableDays || []).includes(day)}
                          onCheckedChange={() => toggleArrayValue("availableDays", day)}
                          data-testid={`checkbox-day-${day.toLowerCase()}`}
                        />
                        <label className="text-sm">{day}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="club">Club Affiliation (Optional)</Label>
                  <Input
                    id="club"
                    value={formData.clubAffiliation || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, clubAffiliation: e.target.value })
                    }
                    placeholder="Enter your club name"
                    data-testid="input-club-affiliation"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
