require("dotenv").config(); // Load environment variables

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

let dbStatus = "Not connected";
let db; // to hold the db reference

// MongoDB client setup
const client = new MongoClient(MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    db = client.db("useless_inventions");
    dbStatus = "Connected to MongoDB Atlas";
    console.log("✅ " + dbStatus);
  } catch (err) {
    dbStatus = "MongoDB connection failed";
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// ✅ Home route with DB status
app.get("/", (req, res) => {
  res.send(`🚀 Server is running! DB Status: ${dbStatus}`);
});

// Ping route
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Sample users route (assumes you have a 'users' collection)
app.get("/users", async (req, res) => {
  try {
    if (!db) throw new Error("Database not connected");
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
});
