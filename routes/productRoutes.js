import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,} from '../controllers/productController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllProducts)
  .post(protect, createProduct); // admin middleware sonradan əlavə olunacaq

router.route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
