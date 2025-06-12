const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB bağlantısı uğurla quruldu');
  } catch (error) {
    console.error('MongoDB bağlantı xətası:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;