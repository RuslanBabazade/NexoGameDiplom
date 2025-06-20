import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  // Authorization başlığında "Bearer" token varsa
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Tokeni çıxar
      token = req.headers.authorization.split(' ')[1];

      // Tokeni yoxla və içindən user ID al
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Useri DB-dən tap və req.user-ə əlavə et (şifrəni çıxar)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Davam et

    } catch (error) {
      console.error('❌ Token xətası:', error);
      res.status(401).json({ message: 'Token etibarsızdır' });
    }
  } else {
    res.status(401).json({ message: 'Token yoxdur, giriş qadağandır' });
  }
};