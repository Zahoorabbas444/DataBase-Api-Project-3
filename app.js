// ═══════════════════════════════════════════════════════════════
//  app.js  –  Express Application Setup & Middleware
// ═══════════════════════════════════════════════════════════════

const express      = require("express");
const userRoutes   = require("./src/routes/userRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// ── Global Middleware ─────────────────────────────────────────
app.use(express.json());                        // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// ── Welcome Route ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success : true,
    message : "Welcome to Project 3 – Database Integration API | Batch 2026",
    version : "1.0.0",
    database: "MongoDB (Mongoose)",
    endpoints: {
      users     : "GET    /api/users",
      userById  : "GET    /api/users/:id",
      userStats : "GET    /api/users/stats",
      createUser: "POST   /api/users",
      updateUser: "PUT    /api/users/:id",
      deleteUser: "DELETE /api/users/:id",
    },
  });
});

// ── API Routes ────────────────────────────────────────────────
app.use("/api/users", userRoutes);

// ── 404 Handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error  : "Route not found",
    message: `The endpoint '${req.method} ${req.originalUrl}' does not exist.`,
  });
});

// ── Global Error Handler (must be last) ──────────────────────
app.use(errorHandler);

module.exports = app;
