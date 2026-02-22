// ═══════════════════════════════════════════════════════════════════
//  EPHEMERA BACKEND — Letters to Your Future Self
//  Node.js + Express API
// ═══════════════════════════════════════════════════════════════════

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "capsules.json");

app.use(cors());
app.use(express.json());

// ─── HELPERS ────────────────────────────────────────────────────────
const read = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

const write = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const isUnlocked = (cap) => new Date(cap.unlockDate) <= new Date();

// ─── ROUTES ─────────────────────────────────────────────────────────

// GET /api/capsules — list all (messages hidden if sealed)
app.get("/api/capsules", (req, res) => {
  const capsules = read().map((c) => {
    const unlocked = isUnlocked(c);
    return {
      ...c,
      unlocked,
      message: unlocked ? c.message : null, // hide message if sealed
      daysLeft: unlocked ? 0 : Math.ceil((new Date(c.unlockDate) - Date.now()) / 86400000),
    };
  });
  res.json(capsules);
});

// GET /api/capsules/:id — single capsule
app.get("/api/capsules/:id", (req, res) => {
  const cap = read().find((c) => c.id === req.params.id);
  if (!cap) return res.status(404).json({ error: "Not found" });

  const unlocked = isUnlocked(cap);
  res.json({
    ...cap,
    unlocked,
    message: unlocked ? cap.message : null,
    daysLeft: unlocked ? 0 : Math.ceil((new Date(cap.unlockDate) - Date.now()) / 86400000),
  });
});

// POST /api/capsules — create new capsule
app.post("/api/capsules", (req, res) => {
  const { title, recipient, message, unlockDate, color, x, y, star } = req.body;

  if (!title || !message || !unlockDate) {
    return res.status(400).json({ error: "title, message, and unlockDate are required" });
  }

  if (new Date(unlockDate) <= new Date()) {
    return res.status(400).json({ error: "unlockDate must be in the future" });
  }

  const capsule = {
    id: crypto.randomUUID(),
    title,
    recipient: recipient || "Future Self",
    message,
    unlockDate,
    createdAt: new Date().toISOString(),
    color: color || "#c9b1e8",
    x: x ?? 10 + Math.random() * 80,
    y: y ?? 10 + Math.random() * 75,
    star: star ?? { size: 1.5 + Math.random() * 2, pulse: 2 + Math.random() * 3 },
  };

  const data = read();
  data.push(capsule);
  write(data);

  res.status(201).json({ ...capsule, unlocked: false, message: null });
});

// DELETE /api/capsules/:id
app.delete("/api/capsules/:id", (req, res) => {
  const data = read();
  const idx = data.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  data.splice(idx, 1);
  write(data);
  res.json({ success: true });
});

// GET /api/stats — beautiful stats for the UI
app.get("/api/stats", (req, res) => {
  const all = read();
  const now = new Date();
  const unlocked = all.filter((c) => new Date(c.unlockDate) <= now);
  const sealed = all.filter((c) => new Date(c.unlockDate) > now);
  const nextUp = sealed.sort((a, b) => new Date(a.unlockDate) - new Date(b.unlockDate))[0];

  res.json({
    total: all.length,
    openCount: unlocked.length,
    sealedCount: sealed.length,
    nextUnlock: nextUp
      ? { title: nextUp.title, date: nextUp.unlockDate, daysLeft: Math.ceil((new Date(nextUp.unlockDate) - now) / 86400000) }
      : null,
    wordCount: all.reduce((sum, c) => sum + c.message.split(/\s+/).length, 0),
  });
});

// ─── START ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✦ Ephemera backend running on http://localhost:${PORT}\n`);
  console.log("  GET    /api/capsules         — list all capsules");
  console.log("  GET    /api/capsules/:id     — single capsule");
  console.log("  POST   /api/capsules         — create capsule");
  console.log("  DELETE /api/capsules/:id     — delete capsule");
  console.log("  GET    /api/stats            — statistics\n");
});
