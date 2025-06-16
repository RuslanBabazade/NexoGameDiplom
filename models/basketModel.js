import mongoose from 'mongoose';

const basketItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const basketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [basketItemSchema],
}, { timestamps: true });

const Basket = mongoose.model('Basket', basketSchema);
export default Basket;
