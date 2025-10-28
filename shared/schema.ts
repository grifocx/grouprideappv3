import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, doublePrecision, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  club: text("club"),
  location: text("location"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
});

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  rideTypes: text("ride_types").array().notNull().default(sql`ARRAY[]::text[]`),
  difficulties: text("difficulties").array().notNull().default(sql`ARRAY[]::text[]`),
  paces: text("paces").array().notNull().default(sql`ARRAY[]::text[]`),
  terrains: text("terrains").array().notNull().default(sql`ARRAY[]::text[]`),
  availableDays: text("available_days").array().notNull().default(sql`ARRAY[]::text[]`),
  clubAffiliation: text("club_affiliation"),
  minDistance: integer("min_distance").default(0),
  maxDistance: integer("max_distance").default(100),
  searchRadius: integer("search_radius").default(50),
});

export const rides = pgTable("rides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  distance: integer("distance").notNull(),
  difficulty: text("difficulty").notNull(),
  pace: text("pace").notNull(),
  terrain: text("terrain").notNull(),
  maxParticipants: integer("max_participants").notNull(),
  description: text("description"),
  organizerId: varchar("organizer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  isArchived: boolean("is_archived").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const rideParticipants = pgTable("ride_participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  rideId: varchar("ride_id").notNull().references(() => rides.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joined_at").default(sql`now()`),
});

export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  rideId: varchar("ride_id").notNull().references(() => rides.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
});

export const insertRideSchema = createInsertSchema(rides).omit({
  id: true,
  createdAt: true,
  isArchived: true,
});

export const insertRideParticipantSchema = createInsertSchema(rideParticipants).omit({
  id: true,
  joinedAt: true,
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, "password">;
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertRide = z.infer<typeof insertRideSchema>;
export type Ride = typeof rides.$inferSelect;
export type InsertRideParticipant = z.infer<typeof insertRideParticipantSchema>;
export type RideParticipant = typeof rideParticipants.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;
