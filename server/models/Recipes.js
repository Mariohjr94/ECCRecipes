import mongoose from 'mongoose';

const mongoose = require('mongoose');const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  category: { 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
   },
   user: {
    type : mongoose.Schema.Types.ObjectId,
    refL : 'User',
    required: true
   }
}, { timestamps: true }); 

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
