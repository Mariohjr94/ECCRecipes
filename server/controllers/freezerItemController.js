const FreezerItem = require("../models/FreezerItem");

exports.getItems = async (req, res) => {
  try {
    const items = await FreezerItem.find().populate("category").populate("addedBy");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, quantity, category } = req.body;
    const item = new FreezerItem({
      name,
      quantity,
      category,
      addedBy: req.user.id  // if you're using token auth
    });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, quantity, category } = req.body;
    const updated = await FreezerItem.findByIdAndUpdate(
      req.params.id,
      { name, quantity, category },
      { new: true }
    );
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deleted = await FreezerItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Not found");
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
