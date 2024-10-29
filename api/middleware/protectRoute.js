import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protecRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Not Authorized, no token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, token invalid",
      });
    }
    const currentUser = await User.findById(decoded.id).select("-password");
    req.user = currentUser;
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized, token expired" });
  }
};
