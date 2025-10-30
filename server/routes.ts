import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertUserPreferencesSchema } from "@shared/schema";

function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Unauthorized");
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // User preferences routes
  app.get("/api/preferences", requireAuth, async (req, res, next) => {
    try {
      const prefs = await storage.getUserPreferences(req.user!.id);
      res.json(prefs);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/preferences", requireAuth, async (req, res, next) => {
    try {
      const validatedData = insertUserPreferencesSchema
        .omit({ id: true })
        .parse({
          ...req.body,
          userId: req.user!.id,
        });

      const existing = await storage.getUserPreferences(req.user!.id);
      let prefs;

      if (existing) {
        prefs = await storage.updateUserPreferences(req.user!.id, validatedData);
      } else {
        prefs = await storage.createUserPreferences(validatedData);
      }

      res.json(prefs);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/preferences", requireAuth, async (req, res, next) => {
    try {
      const validatedData = insertUserPreferencesSchema
        .omit({ id: true, userId: true })
        .partial()
        .parse(req.body);

      const prefs = await storage.updateUserPreferences(
        req.user!.id,
        validatedData,
      );
      res.json(prefs);
    } catch (error) {
      next(error);
    }
  });

  // Rides routes
  app.get("/api/rides", async (req, res, next) => {
    try {
      const rides = await storage.getAllRides();
      res.json(rides);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/rides/:id", async (req, res, next) => {
    try {
      const ride = await storage.getRide(req.params.id);
      if (!ride) {
        return res.status(404).send("Ride not found");
      }
      res.json(ride);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/my-rides", requireAuth, async (req, res, next) => {
    try {
      const rides = await storage.getRidesByOrganizer(req.user!.id);
      res.json(rides);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/rides", requireAuth, async (req, res, next) => {
    try {
      const { insertRideSchema } = await import("@shared/schema");
      const validatedData = insertRideSchema.parse({
        ...req.body,
        organizerId: req.user!.id,
      });

      const ride = await storage.createRide(validatedData);
      res.status(201).json(ride);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/rides/:id", requireAuth, async (req, res, next) => {
    try {
      const ride = await storage.getRide(req.params.id);
      if (!ride) {
        return res.status(404).send("Ride not found");
      }
      if (ride.organizerId !== req.user!.id) {
        return res.status(403).send("Not authorized");
      }

      const { insertRideSchema } = await import("@shared/schema");
      // Prevent changing organizerId
      const validatedData = insertRideSchema
        .omit({ organizerId: true })
        .partial()
        .parse(req.body);

      const updated = await storage.updateRide(req.params.id, validatedData);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/rides/:id", requireAuth, async (req, res, next) => {
    try {
      const ride = await storage.getRide(req.params.id);
      if (!ride) {
        return res.status(404).send("Ride not found");
      }
      if (ride.organizerId !== req.user!.id) {
        return res.status(403).send("Not authorized");
      }

      await storage.deleteRide(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  // Ride participation routes
  app.get("/api/joined-rides", requireAuth, async (req, res, next) => {
    try {
      const participations = await storage.getUserParticipations(req.user!.id);
      const rideIds = participations.map(p => p.rideId);
      
      if (rideIds.length === 0) {
        return res.json([]);
      }
      
      const allRides = await storage.getAllRides();
      const joinedRides = allRides.filter(ride => rideIds.includes(ride.id));
      res.json(joinedRides);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/rides/:id/join", requireAuth, async (req, res, next) => {
    try {
      const ride = await storage.getRide(req.params.id);
      if (!ride) {
        return res.status(404).send("Ride not found");
      }

      // Check if already joined
      const participants = await storage.getRideParticipants(req.params.id);
      const alreadyJoined = participants.some(p => p.userId === req.user!.id);
      if (alreadyJoined) {
        return res.status(400).send("Already joined this ride");
      }

      // Check if ride is full
      if (participants.length >= ride.maxParticipants) {
        return res.status(400).send("Ride is full");
      }

      const participant = await storage.addRideParticipant({
        rideId: req.params.id,
        userId: req.user!.id,
      });
      
      res.status(201).json(participant);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/rides/:id/leave", requireAuth, async (req, res, next) => {
    try {
      const ride = await storage.getRide(req.params.id);
      if (!ride) {
        return res.status(404).send("Ride not found");
      }

      await storage.removeRideParticipant(req.params.id, req.user!.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/rides/:id/participants", async (req, res, next) => {
    try {
      const participants = await storage.getRideParticipants(req.params.id);
      res.json(participants);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
