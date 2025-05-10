const mongoose = require("mongoose");

const freezerItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FreezerCategory",
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

module.exports = mongoose.model("FreezerItem", freezerItemSchema);
