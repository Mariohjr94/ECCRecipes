const express = require("express");
const Category = require('../models/Categories.js')
const authenticateToken = require("../middleware/authenticateToken.js");

const router = express.Router();

// Public route to get all categories
router.get("/", async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
    });

// Protected route to create a new category
router.post("/", authenticateToken, async (req, res, next) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        next(error);
    }
    });

router.put("/:id", authenticateToken, async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
        return res.status(400).json({ message: "Name is required." });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true } // Return the updated document
        );

        if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found." });
        }

        res.json(updatedCategory);
    } catch (error) {
        next(error);
    }
    });

// Protected route to delete a category
router.delete("/:id", authenticateToken, async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
        return res.status(404).send("Category not found.");
        }
        res.json(deletedCategory);
    } catch (error) {
        next(error);
    }
});

module.exports =  router;
