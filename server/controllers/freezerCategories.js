const express = require("express");
const router = express.Router();
const FreezerCategory = require("../models/FreezerCategory");
const authenticateToken = require("../middleware/authenticateToken");
const { re } = require("npm-install");

// Get all categories (public)
router.get("/", async (req, res) => {
  try {
    const categories = await FreezerCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Create new category (protected)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new FreezerCategory({ name });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

//Update a category by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {name} = req.body;

        if (!name) {
            return res.status(400).json({message: "Category name is required"});
        }

        const updatedCategory = await FreezerCategory.findByIdAndUpdate(req.params.id,
        {name},
        {new: true});

        if (!updatedCategory) {
            return res.status(404).json({message: " Category not found"});
        }

        res.json(updatedCategory);
    } catch (error) {
         res.status(500).json({ error: "Failed to update category" });
    }
})

// Delete a category by ID (protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deletedCategory = await FreezerCategory.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted", category: deletedCategory });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});