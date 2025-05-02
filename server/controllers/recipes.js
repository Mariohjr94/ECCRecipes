const express = require("express");
const multer = require("multer");
const Recipe = require("../models/Recipes");
const authenticateToken = require("../middleware/authenticateToken");


const router = express.Router();
const upload = multer();

// Get all recipes (public)
router.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate("category").populate("user");

    const updatedRecipes = recipes.map((recipe) => ({
      ...recipe.toObject(),
      image: recipe.image
        ? `data:image/jpeg;base64,${recipe.image.toString("base64")}`
        : null,
    }));

    res.json(updatedRecipes);
  } catch (error) {
    next(error);
  }
});

// Get a recipe by ID
router.get("/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("category").populate("user");

    if (!recipe) return res.status(404).send("Recipe not found.");

    res.json({
      ...recipe.toObject(),
      image: recipe.image
        ? `data:image/jpeg;base64,${recipe.image.toString("base64")}`
        : null,
    });
  } catch (error) {
    next(error);
  }
});

// Search recipes by name
router.get("/:search", async (req, res) => {
  const searchTerm = req.query.query;
  try {
    const results = await Recipe.find({
      name: { $regex: searchTerm, $options: "i" }
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

// Create a new recipe (protected)
router.post("/", authenticateToken, upload.single("image"), async (req, res, next) => {
  try {
    const { name, ingredients, instructions, category } = req.body;
    const image = req.file?.buffer;

    if (!name || !ingredients || !instructions || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let parsedIngredients = JSON.parse(ingredients);
    let parsedInstructions = JSON.parse(instructions);

    const newRecipe = new Recipe({
      name,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      image,
      category,
      user: req.user.id,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    next(error);
  }
});

// Update recipe (protected)
router.put("/:id", authenticateToken, upload.single("image"), async (req, res, next) => {
  try {
    const { name, ingredients, instructions, category } = req.body;
    const image = req.file?.buffer;

    const updateData = {
      name,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      category,
    };

    if (image) {
      updateData.image = image;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedRecipe) return res.status(404).send("Recipe not found.");

    res.json(updatedRecipe);
  } catch (error) {
    next(error);
  }
});

// Delete a recipe (protected)
router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).send("Recipe not found.");
    res.json(deletedRecipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
