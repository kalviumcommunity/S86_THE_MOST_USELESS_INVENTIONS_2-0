require("dotenv").config(); // Load environment variables

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// MongoDB client setup
const client = new MongoClient(MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server is running!!!");
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/users", async (req, res) => {
  try {
    const db = client.db("useless_inventions");
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users: " + err);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
