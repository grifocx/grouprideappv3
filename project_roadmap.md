# Cyclist Group Ride Connection App - MVP Roadmap

## Project Overview
A web application connecting cyclists to group rides with smart matching, interactive maps, and community features.

## Design Language
**Color Palette:**
- Dark Blue: `#1A0089` (Primary)
- Portland Orange: `#FF5E33` (Accent/CTA)
- White Chocolate: `#EFE7D3` (Background/Light)
- June Bud: `#B7CF4F` (Success/Secondary)

**Typography:**
- Font: JetBrains Mono (open-source, similar to Berkeley Mono v2)

## MVP Feature Set

### Phase 1: Foundation (Week 1)
- [x] Project setup
- [x] TailwindCSS configuration with custom colors
- [x] Database schema design
- [x] Basic routing structure

### Phase 2: Authentication & Profiles (Week 1-2)
**User Management:**
- [x] Username/password registration
- [x] Login/logout system
- [x] Session management
- [x] Profile creation and editing
- [x] Profile fields:
  - Username, email, password
  - Location (city/zip)
  - Riding preferences
  - Bike types owned
  - Club affiliations

### Phase 3: Core Ride Features (Week 2-3)
**Ride Management:**
- [x] Create ride form with:
  - Title, description
  - Date/time
  - Meeting location (lat/lng)
  - Ride type (MTB, Road, Gravel)
  - Difficulty level (Beginner, Intermediate, Advanced, Expert)
  - Pace (Casual, Moderate, Fast, Race)
  - Terrain tags
  - Max participants
  - **Recurring ride configuration (Weekly, Biweekly, Monthly)**
- [x] Browse all rides (list view)
- [x] View ride details
- [x] Join/leave rides
- [x] Edit/delete own rides
- [x] Archive past rides automatically
- [x] **Recurring rides with virtual instance expansion**

### Phase 4: Search & Discovery (Week 3-4)
**Advanced Filtering:**
- [x] Filter by:
  - [x] Ride type
  - [x] Difficulty level
  - [x] Distance range
  - [ ] Pace (future enhancement)
  - [ ] Date range (future enhancement)
  - [ ] Terrain type (future enhancement)
- [x] Search by keywords
- [ ] Sort options (date, distance, participants) (future enhancement)

**Interactive Map:**
- [x] Leaflet.js integration
- [x] Display all rides as markers
- [x] Click marker to view ride preview
- [x] Mobile-optimized map view
- [ ] Cluster markers for nearby rides (future enhancement)
- [ ] Filter map by search criteria (future enhancement)

### Phase 5: Smart Matching (Week 4)
**Preference System:**
- [x] User preference profile:
  - Preferred ride types
  - Terrain preferences
  - Difficulty levels
  - Pace ranges
  - Available days of week
  - Search radius (miles)
- [ ] Match score algorithm
- [ ] "Recommended for You" section
- [ ] Match percentage display on rides

### Phase 6: Community Features (Week 5)
**Social Engagement:**
- [x] Comments on rides
- [x] Ride participant list
- [ ] User activity feed (future enhancement)
- [ ] Club creation and membership (future enhancement)
- [ ] Club-specific rides (future enhancement)
- [ ] User profiles (public view) (future enhancement)

## Technical Stack

### Frontend
- **Framework:** React 18+ with Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui components
- **Routing:** Wouter for lightweight client-side routing
- **Maps:** Leaflet.js for interactive map visualization
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **State:** TanStack Query (React Query) for server state
- **Responsive:** Mobile breakpoint at 768px with adaptive layouts

### Backend
- **API:** Express.js REST API
- **Database:** PostgreSQL via Neon serverless
- **ORM:** Drizzle ORM with type-safe queries
- **Auth:** Passport.js with Local Strategy
- **Password:** Scrypt-based hashing with random salts
- **Sessions:** PostgreSQL-backed session storage

### Deployment
- **Platform:** Replit with built-in deployment (publishing)
- **Database:** Neon PostgreSQL serverless database
- **Development:** Hot module replacement with Vite

## MVP Scope Definition

### In Scope (Must Have)
✅ User registration and authentication
✅ Profile management
✅ Create, edit, delete rides
✅ Browse and search rides
✅ Interactive map view
✅ Join/leave rides
✅ Basic filtering (type, difficulty, distance)
✅ Search by ride title
✅ Comments on rides
✅ Past ride archive
✅ **Recurring rides (weekly, biweekly, monthly)**
✅ **Full mobile responsiveness**

### Phase 7: Mobile Responsiveness (Week 6)
**Mobile Optimization:**
- [x] Mobile-specific bottom navigation bar
- [x] Responsive filter drawer/sheet on mobile
- [x] Full-screen modals on mobile devices
- [x] Responsive typography and spacing
- [x] Mobile-optimized map view
- [x] Touch-friendly UI components
- [x] Shared navigation configuration
- [x] Accessibility improvements (aria-labels, touch targets)

### Out of Scope (Future Enhancements)
❌ Real-time chat
❌ Mobile app (native)
❌ In-app messaging between users
❌ Route planning/GPX upload
❌ Strava integration
❌ Payment/premium features
❌ Event photos/galleries
❌ Notifications (email/push)
❌ Weather integration
❌ User ratings/reviews

## Database Schema Overview

### Users
- id, username, email, password_hash
- location (lat, lng, city)
- bio, avatar_url
- created_at, updated_at

### UserPreferences
- user_id (FK)
- ride_types[], terrain_types[], difficulty_levels[]
- pace_ranges[], available_days[]
- search_radius_miles

### Rides
- id, creator_id (FK)
- title, description
- date_time, duration_hours
- location (lat, lng, address)
- ride_type, difficulty, pace
- terrain_tags[]
- max_participants, is_archived
- **is_recurring, recurrence_pattern, recurrence_day_of_week, recurrence_end_date**
- created_at, updated_at

### RideParticipants
- ride_id (FK), user_id (FK)
- joined_at

### Comments
- id, ride_id (FK), user_id (FK)
- content, created_at

### Clubs
- id, name, description
- created_by (FK), created_at

### ClubMembers
- club_id (FK), user_id (FK)
- joined_at

## Success Metrics (MVP)
- 50+ registered users
- 20+ rides created
- 100+ ride joins
- 50+ comments posted
- Map interaction rate > 60%
- Filter usage > 40%

## Development Timeline
**Total: 6 weeks for MVP**

Week 1: Setup + Auth + Profiles
Week 2-3: Ride CRUD + Map
Week 3-4: Search + Filtering
Week 4: Smart Matching
Week 5: Community Features + Polish
Week 6: Mobile Responsiveness + Testing

## Project Status
✅ **MVP Complete** - All core features implemented and tested
- React 18 + Vite + TypeScript frontend
- Express.js REST API backend
- PostgreSQL database via Neon serverless
- Drizzle ORM for type-safe queries
- Passport.js authentication
- Full mobile responsiveness
- Ready for deployment on Replit
