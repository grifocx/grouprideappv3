import { Ride } from "@shared/schema";

export interface ExpandedRide extends Ride {
  instanceDate?: Date;
  isRecurringInstance?: boolean;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function getNextOccurrence(
  baseDate: Date,
  dayOfWeek: number,
  pattern: string
): Date {
  const result = new Date(baseDate);
  const currentDay = result.getDay();
  
  let daysToAdd = dayOfWeek - currentDay;
  if (daysToAdd <= 0) {
    daysToAdd += 7;
  }
  
  result.setDate(result.getDate() + daysToAdd);
  
  return result;
}

export function expandRecurringRides(rides: Ride[], lookAheadDays: number = 90): ExpandedRide[] {
  const expanded: ExpandedRide[] = [];
  const now = new Date();
  const futureLimit = addDays(now, lookAheadDays);

  for (const ride of rides) {
    if (!ride.isRecurring || !ride.recurrencePattern) {
      expanded.push(ride);
      continue;
    }

    const baseDate = new Date(ride.date);
    const endDate = ride.recurrenceEndDate ? new Date(ride.recurrenceEndDate) : futureLimit;
    const effectiveEndDate = endDate < futureLimit ? endDate : futureLimit;

    let currentDate = new Date(baseDate);
    let instanceCount = 0;
    const maxInstances = 52;

    if (ride.recurrencePattern === "weekly" && ride.recurrenceDayOfWeek !== null) {
      if (baseDate < now) {
        currentDate = getNextOccurrence(now, ride.recurrenceDayOfWeek, "weekly");
      }

      while (currentDate <= effectiveEndDate && instanceCount < maxInstances) {
        expanded.push({
          ...ride,
          id: `${ride.id}_${currentDate.toISOString()}`,
          date: currentDate,
          instanceDate: new Date(currentDate),
          isRecurringInstance: true,
        });
        
        currentDate = addWeeks(currentDate, 1);
        instanceCount++;
      }
    } else if (ride.recurrencePattern === "biweekly" && ride.recurrenceDayOfWeek !== null) {
      if (baseDate < now) {
        currentDate = getNextOccurrence(now, ride.recurrenceDayOfWeek, "biweekly");
      }

      while (currentDate <= effectiveEndDate && instanceCount < maxInstances) {
        expanded.push({
          ...ride,
          id: `${ride.id}_${currentDate.toISOString()}`,
          date: currentDate,
          instanceDate: new Date(currentDate),
          isRecurringInstance: true,
        });
        
        currentDate = addWeeks(currentDate, 2);
        instanceCount++;
      }
    } else if (ride.recurrencePattern === "monthly") {
      while (currentDate <= effectiveEndDate && instanceCount < maxInstances) {
        if (currentDate >= now) {
          expanded.push({
            ...ride,
            id: `${ride.id}_${currentDate.toISOString()}`,
            date: currentDate,
            instanceDate: new Date(currentDate),
            isRecurringInstance: true,
          });
        }
        
        currentDate = addMonths(currentDate, 1);
        instanceCount++;
      }
    }
  }

  return expanded.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
