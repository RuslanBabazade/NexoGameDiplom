import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin funksiyalar
router.route('/')
  .get(protect, getAllUsers); // admin middleware sonradan əlavə olunacaq

router.route('/:id')
  .delete(protect, deleteUser)
  .put(protect, updateUserRole); // admin yoxlaması sonradan əlavə ediləcək

export default router;
