// ═══════════════════════════════════════════════════════════════
//  seed.js  –  Database Seeder Script
//
//  Populates the MongoDB database with sample user data.
//  Run this ONCE after setup to have test data ready.
//
//  Usage:  node seed.js
// ═══════════════════════════════════════════════════════════════

require("dotenv").config();

const mongoose = require("mongoose");
const User     = require("./src/models/User");

const sampleUsers = [
  { name: "Ali Hassan",   email: "ali@example.com",    role: "admin"     },
  { name: "Sara Khan",    email: "sara@example.com",   role: "user"      },
  { name: "Bilal Ahmed",  email: "bilal@example.com",  role: "user"      },
  { name: "Fatima Noor",  email: "fatima@example.com", role: "moderator" },
  { name: "Usman Tariq",  email: "usman@example.com",  role: "user"      },
];

const seedDatabase = async () => {
  try {
    console.log("🔗  Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅  Connected!");

    // Clear existing data
    console.log("🗑️   Clearing existing users...");
    await User.deleteMany({});

    // Insert seed data
    console.log("🌱  Inserting sample users...");
    const inserted = await User.insertMany(sampleUsers);

    console.log(`✅  ${inserted.length} users inserted successfully!\n`);
    inserted.forEach((u) =>
      console.log(`   👤  ${u.name.padEnd(16)} | ${u.email.padEnd(25)} | ${u.role}`)
    );

    console.log("\n🎉  Database seeded! You can now run: npm run dev");
  } catch (err) {
    console.error("❌  Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDatabase();
