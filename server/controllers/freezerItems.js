const express = require("express");
const router = express.Router();
const FreezerItem = require("../models/FreezerItem");
const FreezerCategory = require("../models/FreezerCategory");

// GET all freezer items (with category name)
router.get("/", async (req, res) => {
  try {
    const items = await FreezerItem.find().populate("category");
    res.json(items);
  } catch (err) {
    console.error("Failed to fetch freezer items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET all freezer categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await FreezerCategory.find();
    res.json(categories);
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: Add a new freezer item
router.post("/", async (req, res) => {
  const { name, quantity, category } = req.body;
  if (!name || !quantity) {
    return res.status(400).json({ error: "Name and quantity are required." });
  }
  try {
    const newItem = new FreezerItem({ name, quantity, category });
    const savedItem = await newItem.save();
    const populatedItem = await savedItem.populate("category");
    res.status(201).json(populatedItem);
  } catch (err) {
    console.error("Failed to add freezer item:", err);
    res.status(500).send("Failed to add freezer item.");
  }
});

// PUT: Update an item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity, category } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ error: "Name and quantity are required." });
  }

  try {
    const updatedItem = await FreezerItem.findByIdAndUpdate(
      id,
      { name, quantity, category },
      { new: true }
    ).populate("category");

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    console.error("Failed to update freezer item:", err);
    res.status(500).send("Failed to update freezer item.");
  }
});

// DELETE: Remove an item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await FreezerItem.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    console.error("Failed to delete freezer item:", err);
    res.status(500).send("Failed to delete freezer item.");
  }
});

module.exports = router;
