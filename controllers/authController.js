import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Token generasiya edən funksiya
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Qeydiyyat funksiyası
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'İstifadəçi artıq mövcuddur' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası baş verdi' });
  }
};

// Giriş funksiyası
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'İstifadəçi tapılmadı' });

    const isMatch = await user.matchPassword(password); // BAX BURDA DƏYİŞDİK
    if (!isMatch) return res.status(400).json({ message: 'Email və ya şifrə yalnışdır' });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası' });
  }
};
