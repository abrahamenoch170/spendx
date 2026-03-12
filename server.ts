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
