const express = require('express');
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/me', protect, getProfile);

router.put(
  '/me',
  protect,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('username').optional().trim().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().trim().isEmail().withMessage('A valid email is required'),
  ],
  updateProfile
);

module.exports = router;
