// ═══════════════════════════════════════════════════════════════
//  server.js  –  Entry Point
//  1. Load environment variables
//  2. Connect to MongoDB
//  3. Start the Express server ONLY after DB is connected
// ═══════════════════════════════════════════════════════════════

require("dotenv").config();

const app       = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB first, then start the server
const startServer = async () => {
  await connectDB(); // Will call process.exit(1) if connection fails

  app.listen(PORT, () => {
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║   Project 3 – Database Integration API           ║");
    console.log("║   Industrial Training Kit | Batch 2026           ║");
    console.log("╠══════════════════════════════════════════════════╣");
    console.log(`║  🚀  Server   : http://localhost:${PORT}             ║`);
    console.log(`║  🌍  Env      : ${process.env.NODE_ENV || "development"}                    ║`);
    console.log(`║  📦  Database : MongoDB (Mongoose)                ║`);
    console.log("╚══════════════════════════════════════════════════╝");
  });
};

startServer();
