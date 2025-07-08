import User from "../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// generate a web token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// register logic
const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ username: username });

    if (userExist)
      return res.status(400).json({ message: "User already registered" });

    const user = await User.create({ username, email, password });

    const token = generateToken(user._id);
    res.status(201).json({
      message: "successfully Registered",
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login logic
const LoginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username }).select("+password");

    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: `Welcome back ${username}`,
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { RegisterUser, LoginUser };
