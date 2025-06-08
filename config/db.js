import mongoose from 'mongoose';

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb ugurla baglandi".green.bold);
  } catch (error) {
    console.error("MongoDB baglantisi xeta:".red.bold, error.message);
    process.exit(1);
  }
};

module.exports = connectDB;