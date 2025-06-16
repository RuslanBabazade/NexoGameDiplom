import Product from '../models/productModel.js';

// Create product (admin)
export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

// Get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get product by ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Məhsul tapılmadı' });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete product
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Məhsul silindi' });
};
