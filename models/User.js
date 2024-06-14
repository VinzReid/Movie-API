const mongoose = require("mongoose");

//[SECTION] Schema/Blueprint

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [true, "Pasword is Required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
