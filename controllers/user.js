const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");
const { errorHandler } = require("../auth.js");
const { access } = require("fs");

const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ error: "Email is already in use" });
    }
    const savedUser = await user.save();
    const token = auth.createAccessToken(savedUser);
    res.status(201).send({ message: "Registered successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ error: "Invalid password" });
    }
    const token = auth.createAccessToken(user);
    res.status(200).send({ access: token });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
module.exports = { registerUser, loginUser };
