import Recipe from "../models/Recipes.js";
import User from "../models/User.js";

// Create Recipes

export const createRecipe = async (req, res) => {
    try {
        console.log("Inside createRecipe function");
        console.log("Request body:", req.body);

        const { userId, title, ingredients, instructions, category } = req.body;

        if (!userId || title || ingredients || category) {
            console.log("Missing info in request body");
        return res
        .status(400)
        .json({ message: "Info are required" });
        }

        const user = await User.findById(userId);
            if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
            }

             console.log("User found:", user);

        const newRecipe = new Recipe({
            userId,
            title,
            ingredients,
            instructions,
            category
            });

            console.log("New recipe object:", newRecipe);

    await newRecipe.save();

    console.log("Recipe saved successfully");

    const recipes = await Recipe.find();
    res.status(201).json(recipes);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};
    } catch (error) {
        
    }
}