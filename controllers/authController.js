import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("REQ BODY:", req.body);

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email artıq mövcuddur" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server xətası" });
    console.error("Register error:", err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "İstifadəçi tapılmadı" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Şifrə yalnışdır" });

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server xətası" });
  }
};