import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from '../controllers/userController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin funksiyalar
router.route('/')
  .get(protect, isAdmin, getAllUsers);

router.route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .put(protect, isAdmin, updateUserRole);

export default router;
