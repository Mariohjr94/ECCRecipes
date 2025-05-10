const mongoose = require("mongoose");

const freezerCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("FreezerCategory", freezerCategorySchema);
