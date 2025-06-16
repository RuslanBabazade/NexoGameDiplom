import Basket from '../models/basketModel.js';

// Get user's basket
export const getBasket = async (req, res) => {
  const basket = await Basket.findOne({ user: req.user._id }).populate('items.product');
  res.json(basket || { user: req.user._id, items: [] });
};

// Add to basket
export const addToBasket = async (req, res) => {
  const { productId, quantity } = req.body;

  let basket = await Basket.findOne({ user: req.user._id });
  if (!basket) {
    basket = new Basket({ user: req.user._id, items: [] });
  }

  const itemIndex = basket.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex > -1) {
    basket.items[itemIndex].quantity += quantity;
  } else {
    basket.items.push({ product: productId, quantity });
  }

  await basket.save();
  res.status(200).json(basket);
};

// Remove from basket
export const removeFromBasket = async (req, res) => {
  const { productId } = req.params;
  const basket = await Basket.findOne({ user: req.user._id });

  if (basket) {
    basket.items = basket.items.filter(item => item.product.toString() !== productId);
    await basket.save();
    res.json(basket);
  } else {
    res.status(404).json({ message: 'Sepet tapılmadı' });
  }
};

// Update item quantity
export const updateItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const basket = await Basket.findOne({ user: req.user._id });

  if (basket) {
    const item = basket.items.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await basket.save();
      res.json(basket);
    } else {
      res.status(404).json({ message: 'Məhsul sepetdə yoxdur' });
    }
  } else {
    res.status(404).json({ message: 'Sepet tapılmadı' });
  }
};
