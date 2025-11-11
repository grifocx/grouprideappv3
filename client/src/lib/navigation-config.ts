import { Home, Map, Calendar, Archive, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  testId: string;
}

export const navigationItems: NavItem[] = [
  { 
    title: "Discover", 
    url: "/", 
    icon: Home,
    testId: "link-discover"
  },
  { 
    title: "Map View", 
    url: "/map", 
    icon: Map,
    testId: "link-map-view"
  },
  { 
    title: "My Rides", 
    url: "/my-rides", 
    icon: Calendar,
    testId: "link-my-rides"
  },
  { 
    title: "Archive", 
    url: "/archive", 
    icon: Archive,
    testId: "link-archive"
  },
  { 
    title: "Profile", 
    url: "/profile", 
    icon: User,
    testId: "link-profile"
  },
];

export const primaryNavItems = navigationItems.filter((item) => 
  ["Discover", "Map View", "My Rides", "Profile"].includes(item.title)
);
