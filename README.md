# 🗄️ Database Integration & Persistence
### Industrial Training Kit – Batch 2026 | Project 3

A production-ready REST API built with **Node.js + Express + MongoDB + Mongoose**, implementing full CRUD operations with real database persistence, schema validation, and professional error handling.

---

## 📁 Project Structure

```
p3-database-api/
│
├── server.js                    # Entry point – connects DB then starts server
├── app.js                       # Express app, middleware, routes
├── seed.js                      # Database seeder (run once for test data)
├── package.json                 # Dependencies & scripts
├── .env.example                 # Environment variables template
├── README.md                    # This file
│
└── src/
    ├── config/
    │   └── db.js                # MongoDB connection via Mongoose
    │
    ├── models/
    │   └── User.js              # Mongoose schema + model (database structure)
    │
    ├── routes/
    │   └── userRoutes.js        # Route definitions → controller mapping
    │
    ├── controllers/
    │   └── userController.js    # CRUD logic using Mongoose queries
    │
    ├── middleware/
    │   ├── validateUser.js      # Input validation before DB query
    │   └── errorHandler.js      # Global error handler (Mongoose + custom)
    │
    └── utils/
        └── response.js          # Standardised JSON response helpers
```

---

## ⚙️ Setup & Installation

### Step 1 – Prerequisites
Make sure these are installed on your machine:
- **Node.js** (v18 or higher) → https://nodejs.org
- **MongoDB** (local) → https://www.mongodb.com/try/download/community
  - OR use **MongoDB Atlas** (free cloud) → https://cloud.mongodb.com

### Step 2 – Install dependencies
```bash
npm install
```

### Step 3 – Configure environment
```bash
cp .env.example .env
```
Then open `.env` and set your MongoDB URI:
```env
PORT=3000
NODE_ENV=development

# Local MongoDB
MONGO_URI=mongodb://localhost:27017/training_db

# OR MongoDB Atlas (cloud)
MONGO_URI=mongodb+srv://yourUser:yourPassword@cluster.mongodb.net/training_db
```

### Step 4 – Seed the database (optional but recommended)
```bash
node seed.js
```
This inserts 5 sample users so you have data to work with immediately.

### Step 5 – Start the server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

✅ You should see:
```
✅  MongoDB Connected : localhost
📦  Database Name     : training_db
╔══════════════════════════════════════════════════╗
║  🚀  Server   : http://localhost:3000            ║
╚══════════════════════════════════════════════════╝
```

---

## 🔌 API Endpoints

Base URL: `http://localhost:3000/api`

| Method   | Endpoint              | Description                    | Status Codes        |
|----------|-----------------------|--------------------------------|---------------------|
| `GET`    | `/api/users`          | Get all users                  | 200                 |
| `GET`    | `/api/users/stats`    | Get user count by role         | 200                 |
| `GET`    | `/api/users/:id`      | Get a single user by ID        | 200, 400, 404       |
| `POST`   | `/api/users`          | Create a new user              | 201, 400, 409       |
| `PUT`    | `/api/users/:id`      | Update an existing user        | 200, 400, 404, 409  |
| `DELETE` | `/api/users/:id`      | Delete a user by ID            | 200, 400, 404       |

### Optional query parameters for GET /api/users:
```
GET /api/users?role=admin           → filter by role
GET /api/users?search=ali           → search by name
```

---

## 📋 Sample Requests & Responses

### ✅ GET all users
```http
GET http://localhost:3000/api/users
```
```json
{
  "success": true,
  "message": "5 user(s) found.",
  "data": {
    "count": 5,
    "users": [
      {
        "id": "665f1a2b3c4d5e6f7a8b9c0d",
        "name": "Ali Hassan",
        "email": "ali@example.com",
        "role": "admin",
        "createdAt": "2026-04-26T10:00:00.000Z",
        "updatedAt": "2026-04-26T10:00:00.000Z"
      }
    ]
  }
}
```

---

### ✅ GET user stats
```http
GET http://localhost:3000/api/users/stats
```
```json
{
  "success": true,
  "message": "User statistics retrieved successfully.",
  "data": {
    "totalUsers": 5,
    "byRole": [
      { "role": "user", "count": 3 },
      { "role": "admin", "count": 1 },
      { "role": "moderator", "count": 1 }
    ]
  }
}
```

---

### ✅ POST – Create a user
```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Zara Malik",
  "email": "zara@example.com",
  "role": "user"
}
```
**201 Created:**
```json
{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "id": "665f1a2b3c4d5e6f7a8b9c0e",
    "name": "Zara Malik",
    "email": "zara@example.com",
    "role": "user",
    "createdAt": "2026-04-26T11:00:00.000Z"
  }
}
```

**400 Bad Request (validation failed):**
```json
{
  "success": false,
  "error": "Validation failed. Please fix the errors below.",
  "details": [
    { "field": "name", "message": "Name is required." },
    { "field": "email", "message": "Email format is invalid (e.g. user@domain.com)." }
  ]
}
```

**409 Conflict (duplicate email):**
```json
{
  "success": false,
  "error": "Duplicate value: 'zara@example.com' is already in use for field 'email'."
}
```

---

### ✅ PUT – Update a user
```http
PUT http://localhost:3000/api/users/<id>
Content-Type: application/json

{
  "name": "Sara Ahmed",
  "role": "moderator"
}
```

---

### ✅ DELETE – Delete a user
```http
DELETE http://localhost:3000/api/users/<id>
```
```json
{
  "success": true,
  "message": "User 'Sara Ahmed' has been deleted successfully."
}
```

---

## 🗄️ Database Schema

Collection: `users`

| Field       | Type      | Constraints                          |
|-------------|-----------|--------------------------------------|
| `_id`       | ObjectId  | Auto-generated primary key           |
| `name`      | String    | Required · 2–50 chars                |
| `email`     | String    | Required · Unique · Valid format     |
| `role`      | String    | Enum: user / admin / moderator       |
| `createdAt` | Date      | Auto-set by Mongoose timestamps      |
| `updatedAt` | Date      | Auto-updated by Mongoose timestamps  |

---

## 🛡️ Validation Rules

| Field   | Rule                                              |
|---------|---------------------------------------------------|
| `name`  | Required · String · 2–50 characters               |
| `email` | Required · Valid format · Unique in database      |
| `role`  | Optional · Must be: `user`, `admin`, `moderator`  |

---

## 📊 HTTP Status Codes

| Code | Status                | When                                         |
|------|-----------------------|----------------------------------------------|
| 200  | OK                    | Successful GET, PUT, DELETE                  |
| 201  | Created               | Successful POST (user created in DB)         |
| 400  | Bad Request           | Validation error or invalid MongoDB ID       |
| 404  | Not Found             | User ID not found in database                |
| 409  | Conflict              | Duplicate email (unique constraint violated) |
| 500  | Internal Server Error | Unhandled exception or DB connection failure |

---

## 🧪 Testing with Postman

1. Open **Postman** → New Collection → Name it `Project 3 – Database API`
2. Add requests for all 6 endpoints above
3. For `POST` / `PUT`: Body → raw → JSON
4. Copy the `id` from a GET response and use it in `/:id` routes
5. Try sending bad data to see validation errors in action

---

## 🧠 Key Concepts Demonstrated

- ✅ MongoDB database design & schema creation
- ✅ Mongoose model with built-in validation
- ✅ Full CRUD with real database persistence
- ✅ MongoDB aggregation pipeline (stats endpoint)
- ✅ Unique index & duplicate key error handling
- ✅ CastError handling (invalid ObjectId)
- ✅ Async/await with try-catch-next pattern
- ✅ Environment variables (.env) for config
- ✅ Database seeder script
- ✅ Layered architecture: Route → Middleware → Controller → Model → DB

---

## 🔗 Project Series

| Project   | Focus          | Stack                        |
|-----------|----------------|------------------------------|
| Project 1 | Frontend        | HTML · CSS · JavaScript      |
| Project 2 | Backend API     | Node.js · Express            |
| Project 3 | Database ✅ This | Node.js · Express · MongoDB  |

---

*Industrial Training Kit – Batch 2026 | Project 3 of 3*
