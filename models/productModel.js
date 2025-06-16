import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['Xbox', 'PlayStation', 'Steam', 'Epic', 'Nintendo', 'PC'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Game', 'Currency', 'GiftCard'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  redeemCode: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  inStock: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
