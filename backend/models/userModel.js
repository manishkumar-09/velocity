const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
