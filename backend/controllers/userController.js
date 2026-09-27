const { validationResult } = require('express-validator');
const User = require('../models/User');
const Prediction = require('../models/Prediction');

const getProfile = async (req, res) => {
  try {
    const predictionCount = await Prediction.countDocuments({ userId: req.user._id });

    return res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
      predictionCount,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { name, username, email } = req.body;
    const updates = {};

    if (name) updates.name = name.trim();
    if (username) updates.username = username.trim().toLowerCase();
    if (email) updates.email = email.trim().toLowerCase();

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided to update' });
    }

    if (updates.username || updates.email) {
      const duplicateUser = await User.findOne({
        _id: { $ne: req.user._id },
        $or: [
          updates.username ? { username: updates.username } : null,
          updates.email ? { email: updates.email } : null,
        ].filter(Boolean),
      });

      if (duplicateUser) {
        return res.status(409).json({
          message: duplicateUser.username === updates.username ? 'Username already exists' : 'Email already exists',
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while updating profile' });
  }
};

module.exports = { getProfile, updateProfile };
