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

  const httpServer = createServer(app);

  return httpServer;
}
