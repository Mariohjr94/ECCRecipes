const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: {
        type: String,
        require: true,
        min: 2,
        max: 50,
    },
    password: {
        type: String,
        require: true,
        min: 5,
    }
  },
  {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
module.exports = User;