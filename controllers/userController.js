import User from '../models/userModel.js';

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'İstifadəçi tapılmadı' });
  }
};

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: 'İstifadəçi tapılmadı' });
  }
};

// @desc   Get all users (admin)
// @route  GET /api/users
// @access Private/Admin
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// @desc   Delete user by ID (admin)
// @route  DELETE /api/users/:id
// @access Private/Admin
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'İstifadəçi silindi' });
  } else {
    res.status(404).json({ message: 'İstifadəçi tapılmadı' });
  }
};

// @desc   Update user role (admin)
// @route  PUT /api/users/:id
// @access Private/Admin
export const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.role = req.body.role || user.role;
    const updated = await user.save();
    res.json({ message: 'İstifadəçi rolu yeniləndi', user: updated });
  } else {
    res.status(404).json({ message: 'İstifadəçi tapılmadı' });
  }
};
