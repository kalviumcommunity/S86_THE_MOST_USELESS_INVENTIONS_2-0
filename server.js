require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

let dbStatus = "Not connected";
let db;

// MongoDB client setup
const client = new MongoClient(MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    db = client.db("useless_inventions");
    dbStatus = "Connected to MongoDB Atlas";
    console.log("✅ " + dbStatus);

    // ✅ Import and use routes *after* DB is ready
    const routes = require("./routes")(db);
    app.use("/api", routes);

    // ✅ Start the server only after DB is ready
    app.listen(PORT, () => {
      console.log(`🌍 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    dbStatus = "MongoDB connection failed";
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// Home route
app.get("/", (req, res) => {
  res.send(`🚀 Server is running! DB Status: ${dbStatus}`);
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});
