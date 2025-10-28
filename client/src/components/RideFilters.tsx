import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useState } from "react";

export interface RideFiltersState {
  rideTypes: string[];
  difficulties: string[];
  distanceRange: [number, number];
  availableDays: string[];
}

interface RideFiltersProps {
  filters: RideFiltersState;
  onFiltersChange: (filters: RideFiltersState) => void;
  onClear: () => void;
}

export function RideFilters({ filters, onFiltersChange, onClear }: RideFiltersProps) {
  const rideTypes = ["MTB", "Road", "Gravel"];
  const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleRideType = (type: string) => {
    const newTypes = filters.rideTypes.includes(type)
      ? filters.rideTypes.filter((t) => t !== type)
      : [...filters.rideTypes, type];
    onFiltersChange({ ...filters, rideTypes: newTypes });
  };

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulties = filters.difficulties.includes(difficulty)
      ? filters.difficulties.filter((d) => d !== difficulty)
      : [...filters.difficulties, difficulty];
    onFiltersChange({ ...filters, difficulties: newDifficulties });
  };

  const toggleDay = (day: string) => {
    const newDays = filters.availableDays.includes(day)
      ? filters.availableDays.filter((d) => d !== day)
      : [...filters.availableDays, day];
    onFiltersChange({ ...filters, availableDays: newDays });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <CardTitle className="text-lg">Filters</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            data-testid="button-clear-filters"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Ride Type</Label>
          <div className="space-y-2">
            {rideTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.rideTypes.includes(type)}
                  onCheckedChange={() => toggleRideType(type)}
                  data-testid={`checkbox-type-${type.toLowerCase()}`}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Difficulty</Label>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox
                  id={`difficulty-${difficulty}`}
                  checked={filters.difficulties.includes(difficulty)}
                  onCheckedChange={() => toggleDifficulty(difficulty)}
                  data-testid={`checkbox-difficulty-${difficulty.toLowerCase()}`}
                />
                <Label
                  htmlFor={`difficulty-${difficulty}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {difficulty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">
            Distance: {filters.distanceRange[0]}-{filters.distanceRange[1]} mi
          </Label>
          <Slider
            value={filters.distanceRange}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, distanceRange: value as [number, number] })
            }
            min={0}
            max={100}
            step={5}
            data-testid="slider-distance"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Available Days</Label>
          <div className="grid grid-cols-4 gap-2">
            {days.map((day) => (
              <Button
                key={day}
                variant={filters.availableDays.includes(day) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleDay(day)}
                className="text-xs"
                data-testid={`button-day-${day.toLowerCase()}`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
