import { db, pool } from "./db";
import {
  type User,
  type InsertUser,
  users,
  type UserPreferences,
  type InsertUserPreferences,
  userPreferences,
  type Ride,
  type InsertRide,
  rides,
  type RideParticipant,
  type InsertRideParticipant,
  rideParticipants,
  type Comment,
  type InsertComment,
  comments,
} from "@shared/schema";
import { eq, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;

  // User preferences operations
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  createUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences>;
  updateUserPreferences(userId: string, updates: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined>;

  // Ride operations
  getRide(id: string): Promise<Ride | undefined>;
  getAllRides(): Promise<Ride[]>;
  getRidesByOrganizer(organizerId: string): Promise<Ride[]>;
  createRide(ride: InsertRide): Promise<Ride>;
  updateRide(id: string, updates: Partial<InsertRide>): Promise<Ride | undefined>;
  deleteRide(id: string): Promise<void>;

  // Ride participant operations
  getRideParticipants(rideId: string): Promise<RideParticipant[]>;
  getUserParticipations(userId: string): Promise<RideParticipant[]>;
  addRideParticipant(participant: InsertRideParticipant): Promise<RideParticipant>;
  removeRideParticipant(rideId: string, userId: string): Promise<void>;

  // Comment operations
  getRideComments(rideId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: string): Promise<void>;

  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user;
  }

  // User preferences operations
  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    const [prefs] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
    return prefs;
  }

  async createUserPreferences(insertPrefs: InsertUserPreferences): Promise<UserPreferences> {
    const [prefs] = await db.insert(userPreferences).values(insertPrefs).returning();
    return prefs;
  }

  async updateUserPreferences(userId: string, updates: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined> {
    const [prefs] = await db.update(userPreferences)
      .set(updates)
      .where(eq(userPreferences.userId, userId))
      .returning();
    return prefs;
  }

  // Ride operations
  async getRide(id: string): Promise<Ride | undefined> {
    const [ride] = await db.select().from(rides).where(eq(rides.id, id));
    return ride;
  }

  async getAllRides(): Promise<Ride[]> {
    return await db.select().from(rides).where(eq(rides.isArchived, false));
  }

  async getRidesByOrganizer(organizerId: string): Promise<Ride[]> {
    return await db.select().from(rides).where(eq(rides.organizerId, organizerId));
  }

  async createRide(insertRide: InsertRide): Promise<Ride> {
    const [ride] = await db.insert(rides).values(insertRide).returning();
    return ride;
  }

  async updateRide(id: string, updates: Partial<InsertRide>): Promise<Ride | undefined> {
    const [ride] = await db.update(rides).set(updates).where(eq(rides.id, id)).returning();
    return ride;
  }

  async deleteRide(id: string): Promise<void> {
    await db.delete(rides).where(eq(rides.id, id));
  }

  // Ride participant operations
  async getRideParticipants(rideId: string): Promise<RideParticipant[]> {
    return await db.select().from(rideParticipants).where(eq(rideParticipants.rideId, rideId));
  }

  async getUserParticipations(userId: string): Promise<RideParticipant[]> {
    return await db.select().from(rideParticipants).where(eq(rideParticipants.userId, userId));
  }

  async addRideParticipant(insertParticipant: InsertRideParticipant): Promise<RideParticipant> {
    const [participant] = await db.insert(rideParticipants).values(insertParticipant).returning();
    return participant;
  }

  async removeRideParticipant(rideId: string, userId: string): Promise<void> {
    await db.delete(rideParticipants)
      .where(
        and(
          eq(rideParticipants.rideId, rideId),
          eq(rideParticipants.userId, userId)
        )
      );
  }

  // Comment operations
  async getRideComments(rideId: string): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.rideId, rideId));
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db.insert(comments).values(insertComment).returning();
    return comment;
  }

  async deleteComment(id: string): Promise<void> {
    await db.delete(comments).where(eq(comments.id, id));
  }
}

export const storage = new DatabaseStorage();
