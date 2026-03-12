import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/spendx/create", (req, res) => {
    const { itinerary, totalBudget, mode } = req.body;
    const shareLink = `spendx.app/s/${uuidv4()}`;
    
    console.log("Creating spendx:", { itinerary, totalBudget, mode, shareLink });
    
    // Mock Supabase save
    res.json({ success: true, shareLink });
  });

  app.post("/api/streak/validate", (req, res) => {
    const { userId } = req.body;
    console.log("Validating streak for user:", userId);
    
    // Mock Supabase save
    res.json({ success: true, message: "Streak validated for today" });
  });

  app.post("/api/squad/create", (req, res) => {
    const { userId, name } = req.body;
    const squadId = uuidv4();
    const inviteLink = `spendx.app/r/${squadId}`;
    
    console.log("Creating squad:", { userId, name, squadId, inviteLink });
    
    // Mock Supabase save
    res.json({ success: true, squadId, inviteLink });
  });

  app.post("/api/squad/join", (req, res) => {
    const { userId, squadId } = req.body;
    console.log("Adding user to squad:", { userId, squadId });
    
    // Mock Supabase save
    res.json({ success: true });
  });

  app.get("/api/venues/fetch-for-city", (req, res) => {
    const { city_slug, minLat, maxLat, minLng, maxLng } = req.query;
    console.log("Fetching venues for:", { city_slug, minLat, maxLat, minLng, maxLng });
    
    // Mock venue data
    const venues = [
      { id: 'v1', name: 'Cool Cafe', lat: 43.77, lng: 11.25, category: 'food', address: '123 Main St', vibe_score: 8.5 },
      { id: 'v2', name: 'Fun Bar', lat: 43.78, lng: 11.26, category: 'drink', address: '456 Side St', vibe_score: 9.0 },
    ];
    
    res.json({ success: true, venues });
  });

  app.get("/api/location/ip", async (req, res) => {
    try {
      // Use a server-side fetch to avoid CORS
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Server-side IP lookup failed:", error);
      res.status(500).json({ error: "Failed to fetch location" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
