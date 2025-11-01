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
- [x] Browse all rides (list view)
- [x] View ride details
- [x] Join/leave rides
- [x] Edit/delete own rides
- [x] Archive past rides automatically

### Phase 4: Search & Discovery (Week 3-4)
**Advanced Filtering:**
- [x] Filter by:
  - [x] Ride type
  - [x] Difficulty level
  - [ ] Pace
  - [x] Distance from user
  - [ ] Date range
  - [ ] Terrain type
- [x] Search by keywords
- [ ] Sort options (date, distance, participants)

**Interactive Map:**
- [x] Leaflet.js integration
- [x] Display all rides as markers
- [ ] Cluster markers for nearby rides
- [x] Click marker to view ride preview
- [ ] Filter map by search criteria

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
- [ ] Comments on rides
- [ ] User activity feed
- [ ] Club creation and membership
- [ ] Club-specific rides
- [x] Ride participant list
- [ ] User profiles (public view)

## Technical Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui components
- **Maps:** Leaflet + React-Leaflet
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **State:** React Context + useState/useReducer

### Backend
- **API:** Next.js API Routes
- **Database:** SQLite (for MVP, easily upgradable to PostgreSQL)
- **ORM:** Prisma
- **Auth:** NextAuth.js with Credentials provider
- **Password:** bcrypt for hashing

### Deployment
- **Platform:** Vercel (optimized for Next.js)
- **Database:** Initially local SQLite, migrate to hosted PostgreSQL for production

## MVP Scope Definition

### In Scope (Must Have)
✅ User registration and authentication
✅ Profile management
✅ Create, edit, delete rides
✅ Browse and search rides
✅ Interactive map view
✅ Join/leave rides
✅ Basic filtering (type, difficulty, pace)
✅ Comments on rides
✅ Geographic search within radius
✅ Past ride archive

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
**Total: 5 weeks for MVP**

Week 1: Setup + Auth + Profiles
Week 2-3: Ride CRUD + Map
Week 3-4: Search + Filtering
Week 4: Smart Matching
Week 5: Community Features + Polish

## Next Steps
1. Initialize Next.js project
2. Set up database with Prisma
3. Configure authentication
4. Build core UI components
5. Implement features iteratively
