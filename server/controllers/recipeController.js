const Recipe = require("../models/Recipe");

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("category").populate("user");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("category").populate("user");
    if (!recipe) return res.status(404).send("Not found");
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a recipe
exports.createRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions, category } = req.body;
    const recipe = new Recipe({
      name,
      ingredients,
      instructions,
      category,
      user: req.user?.id || null,
    });
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions, category } = req.body;
    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      { name, ingredients, instructions, category },
      { new: true }
    );
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get user recipes
exports.getMyRecipes = async (req, res) => {
  try {
    const myRecipes = await Recipe.find({ user: req.user.id }).populate("category");
    res.json(myRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Not found");
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
