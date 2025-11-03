# GroupRideApp - Cyclist Group Ride Connection Platform

## Overview

GroupRideApp is a web application that connects cyclists with group rides tailored to their preferences. The platform allows users to discover rides, organize events, view ride locations on an interactive map, and manage their cycling community connections. Users can filter rides by type (MTB, Road, Gravel), difficulty level, pace, terrain, and location to find their perfect cycling experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **November 3, 2025:** Implemented recurring rides feature:
  - Users can now create rides that repeat on a weekly, biweekly, or monthly schedule
  - Recurring rides show a badge with the recurrence pattern (Weekly, Biweekly, Monthly)
  - Supports day-of-week selection for weekly/biweekly patterns
  - Optional end date configuration (defaults to 90 days ahead if not specified)
  - Virtual instances generated on-the-fly for display without creating duplicate database records
  - Backend expansion logic automatically generates recurring ride instances within the query window
  - Schema fields: isRecurring, recurrencePattern, recurrenceDayOfWeek, recurrenceEndDate
- **October 30, 2025:** Implemented ride joining feature:
  - Users can now join and leave rides through the ride detail modal
  - Real-time participant count displayed (e.g., "3 / 8 riders")
  - Join/leave buttons disabled while loading to prevent race conditions
  - Validation prevents joining full or archived rides
  - My Rides page redesigned with tabs showing both "Organized" and "Joined" rides
  - API endpoints: POST `/api/rides/:id/join`, DELETE `/api/rides/:id/leave`, GET `/api/joined-rides`
- **October 28, 2025:** Updated brand color palette to use exact hex codes:
  - Portland Orange (#FF5E33) for primary CTAs and buttons
  - June Bud (#B7CF4F) for secondary actions
  - Dark Blue (#1A0089) for text and supporting elements
  - White Chocolate (#EFE7D3) for backgrounds
- **October 28, 2025:** Converted all distance measurements to imperial units (miles)
- **October 28, 2025:** Rebranded from "RideConnect" to "GroupRideApp"

## Features

### Recurring Rides

The platform supports creating rides that repeat on a regular schedule, enabling organizers to set up weekly training rides, monthly social events, or biweekly club meetups without creating individual entries for each occurrence.

**Configuration Options:**
- **Recurrence Pattern:** Weekly, Biweekly, or Monthly
- **Day of Week:** For weekly/biweekly patterns, specify which day the ride repeats (Sunday through Saturday)
- **End Date:** Optional - set a specific end date or leave blank to generate instances up to 90 days ahead
- **Base Details:** All ride details (title, type, difficulty, pace, distance, location, etc.) are inherited by each occurrence

**Technical Implementation:**
- Single database record stores the recurring ride configuration
- Backend expansion logic (`server/recurring-rides.ts`) generates virtual instances on-the-fly when rides are queried
- Each virtual instance includes:
  - `instanceId`: Unique identifier for UI rendering (format: `${rideId}_${isoDate}`)
  - `instanceDate`: The specific occurrence date
  - `isRecurringInstance`: Boolean flag marking it as a virtual instance
  - Original `id`: Preserved for API calls (join, leave, participants)
- Virtual instances are sorted by date and displayed alongside one-time rides

**User Experience:**
- Recurring rides display a badge showing their pattern (Weekly, Biweekly, Monthly)
- Users see all upcoming occurrences in the ride list
- Joining a recurring ride currently joins all occurrences (single participant record)
- Recurring rides can be archived like regular rides

**Limitations (MVP):**
- Joining applies to all occurrences, not individual instances
- Maximum 52 instances generated per recurring ride to prevent performance issues
- Modifications to recurring rides affect all future occurrences

### Ride Discovery and Filtering

Users can discover rides through comprehensive filtering and search capabilities:
- Filter by ride type (MTB, Road, Gravel)
- Filter by difficulty level (Beginner, Intermediate, Advanced, Expert)
- Filter by distance range (0-200 miles)
- Search by ride title
- All filters work with both one-time and recurring rides

### Ride Participation

- Join and leave rides through the ride detail modal
- Real-time participant count tracking
- Validation prevents joining full or archived rides
- View organized rides vs joined rides in "My Rides" page

### Interactive Map

- Visual display of ride locations using Leaflet.js
- Marker clustering for dense areas
- Click markers to view ride details

## System Architecture

### Frontend Architecture

**Framework:** React 18+ with TypeScript, using Vite as the build tool and development server.

**Routing:** Wouter for lightweight client-side routing, with protected routes requiring authentication.

**UI Components:** shadcn/ui component library built on Radix UI primitives, providing a comprehensive set of accessible, customizable components. The design system follows a "New York" style variant with custom theming.

**Styling:** Tailwind CSS with custom design tokens defined in CSS variables, supporting both light and dark modes. The design uses a monospace font (JetBrains Mono) for a distinctive, data-focused aesthetic inspired by activity platforms like Strava.

**Brand Colors:**
- Portland Orange: #FF5E33 (HSL: 13, 100%, 60%) - Primary CTAs and buttons
- June Bud: #B7CF4F (HSL: 71, 57%, 56%) - Secondary actions
- Dark Blue: #1A0089 (HSL: 251, 100%, 27%) - Text and supporting elements
- White Chocolate: #EFE7D3 (HSL: 43, 47%, 88%) - Background variations

**Units:** All distance measurements use imperial units (miles), not metric.

**State Management:** TanStack Query (React Query) for server state management, caching, and synchronization. Local component state handled with React hooks.

**Form Handling:** React Hook Form with Zod schema validation for type-safe form inputs.

### Backend Architecture

**Server Framework:** Express.js running on Node.js with TypeScript.

**Authentication:** Passport.js with Local Strategy for username/password authentication. Sessions are managed using express-session with PostgreSQL-backed session storage (connect-pg-simple).

**Password Security:** Scrypt-based password hashing with random salts for secure credential storage.

**API Design:** RESTful API endpoints under `/api` namespace, with authentication middleware protecting user-specific routes.

**Database Access:** Drizzle ORM for type-safe database queries and schema management, providing automatic TypeScript types from database schema.

### Data Storage

**Database:** PostgreSQL via Neon serverless database, chosen for scalability and managed infrastructure.

**Schema Design:**
- **Users table:** Stores authentication credentials, profile information (email, club affiliation), and geographic coordinates for location-based features.
- **User Preferences table:** Stores personalized filter settings (ride types, difficulties, paces, terrains, available days, distance ranges, search radius) with cascade deletion on user removal.
- **Rides table:** Contains ride details including title, type, date/time, location coordinates, distance, difficulty, pace, terrain, participant limits, and organizer reference. Supports archiving for completed rides. Includes recurring ride configuration (isRecurring, recurrencePattern, recurrenceDayOfWeek, recurrenceEndDate).
- **Ride Participants table:** Junction table managing many-to-many relationships between users and rides with status tracking.
- **Comments table:** User-generated comments on rides with timestamps and references to both users and rides.

**Geographic Features:** Latitude/longitude coordinates stored for both users and rides to enable location-based filtering and map visualization.

**Recurring Rides:** The system supports rides that repeat on a schedule (weekly, biweekly, or monthly). Recurring rides are stored once in the database with pattern configuration, then expanded into virtual instances on-the-fly for display. This approach keeps the database lean while providing users with a comprehensive view of upcoming ride occurrences.

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled component foundations
- Tailwind CSS for utility-first styling
- Lucide React for iconography

**Mapping:**
- Leaflet.js for interactive map visualization with OpenStreetMap tiles
- Client-side map rendering with marker clustering for ride locations

**Development Tools:**
- Vite for fast development server and optimized production builds
- Replit-specific plugins for runtime error handling, cartographer, and dev banner (development environment only)
- TypeScript for type safety across the entire stack

**Database & ORM:**
- Neon PostgreSQL serverless database
- Neon WebSocket support for database connections
- Drizzle ORM for schema management and queries
- Drizzle Kit for database migrations

**Session Management:**
- PostgreSQL-backed session store for persistent authentication across server restarts
- Secure session configuration with environment-based secrets

**Validation:**
- Zod for runtime type validation and schema definition
- Drizzle-Zod for automatic schema generation from database models

**Date Handling:**
- date-fns for date formatting and relative time displays

**Build & Runtime:**
- esbuild for server-side bundling
- tsx for TypeScript execution in development
- Path aliases configured for clean imports (@/, @shared/, @assets/)