import dotenv from 'dotenv';
dotenv.config();
console.log('✅ ENV TEST:', process.env.GOOGLE_CLIENT_ID);


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import connectDB from './config/config.js';
connectDB(); // MongoDB bağlantısı

import './config/passport.js'; // dotenv-dən sonra gəlməlidir

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import basketRoutes from './routes/basketRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/basket', basketRoutes);

app.get('/', (req, res) => {
  res.send('🎮 NexoGame Backend is Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda işə düşdü`);
});
