const FreezerCategory = require("../models/FreezerCategory");

exports.getCategories = async (req, res) => {
  try {
    const categories = await FreezerCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new FreezerCategory({ name });
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await FreezerCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Not found");
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
