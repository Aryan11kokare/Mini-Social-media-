import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  console.log("into the signup");
  try {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(401).json("User already exist!");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json("User created succefully");
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json("User not found!");
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json("Wrong password!");
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.JWT_SECRET,
    );

    res.status(200).json({ token: token });
  } catch (e) {
    console.log(e);
  }
};

export const getUser = (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
};
