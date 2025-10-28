import { RideFilters, type RideFiltersState } from '../RideFilters';
import { useState } from 'react';

export default function RideFiltersExample() {
  const [filters, setFilters] = useState<RideFiltersState>({
    rideTypes: ["MTB"],
    difficulties: ["Intermediate"],
    distanceRange: [10, 50],
    availableDays: ["Sat", "Sun"]
  });

  return (
    <div className="p-4 max-w-sm">
      <RideFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClear={() => setFilters({
          rideTypes: [],
          difficulties: [],
          distanceRange: [0, 100],
          availableDays: []
        })}
      />
    </div>
  );
}
