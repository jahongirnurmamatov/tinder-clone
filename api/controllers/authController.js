import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  // jwt token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
const signup = async (req, res) => {
  const { name, email, password, age, gender, genderPreference } = req.body;
  try {
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (age < 18) {
      return res
        .status(400)
        .json({ message: "You are not eligible to use this app" });
    }
    const user = await User.create({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });
    const token = signToken(user._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || (await user.matchPassword(password)) === false) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = signToken(user._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export { signup, login, logout };
