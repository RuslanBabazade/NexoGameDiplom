import express from 'express';
import { getBasket, addToBasket, removeFromBasket, updateItemQuantity, } from '../controllers/basketController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getBasket);
router.post('/add', protect, addToBasket);
router.delete('/remove/:productId', protect, removeFromBasket);
router.put('/update', protect, updateItemQuantity);

export default router;
