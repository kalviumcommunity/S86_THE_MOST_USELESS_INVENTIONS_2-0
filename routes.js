const express = require("express");
const router = express.Router();

module.exports = function (db) {
  const collection = db.collection("inventions");

  // CREATE
  router.post("/inventions", async (req, res) => {
    try {
      const result = await collection.insertOne(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).send("Error adding invention: " + err.message);
    }
  });

  // READ (all)
  router.get("/inventions", async (req, res) => {
    try {
      const data = await collection.find().toArray();
      res.json(data);
    } catch (err) {
      res.status(500).send("Error fetching inventions: " + err.message);
    }
  });

  // READ (one)
  router.get("/inventions/:id", async (req, res) => {
    const { ObjectId } = require("mongodb");
    try {
      const invention = await collection.findOne({ _id: new ObjectId(req.params.id) });
      if (!invention) return res.status(404).send("Invention not found");
      res.json(invention);
    } catch (err) {
      res.status(500).send("Error fetching invention: " + err.message);
    }
  });

  // UPDATE
  router.put("/inventions/:id", async (req, res) => {
    const { ObjectId } = require("mongodb");
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.json(result);
    } catch (err) {
      res.status(500).send("Error updating invention: " + err.message);
    }
  });

  // DELETE
  router.delete("/inventions/:id", async (req, res) => {
    const { ObjectId } = require("mongodb");
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.json(result);
    } catch (err) {
      res.status(500).send("Error deleting invention: " + err.message);
    }
  });

  return router;
};
