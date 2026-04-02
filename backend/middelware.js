import jwt from "jsonwebtoken";
import User from "./models/user.js";

export const auth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(verified.id);
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }
    req.user = foundUser;
    next();
  } catch (err) {
    res.status(400).json(err.message);
  }
};
