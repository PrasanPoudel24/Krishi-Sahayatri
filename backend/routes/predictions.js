const express = require('express');
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const {
  cropPrediction,
  yieldPrediction,
  getPredictionHistory,
} = require('../controllers/predictionController');

const router = express.Router();

router.post(
  '/crop',
  protect,
  [
    body('N').isFloat({ min: 0 }).withMessage('N must be a number'),
    body('P').isFloat({ min: 0 }).withMessage('P must be a number'),
    body('K').isFloat({ min: 0 }).withMessage('K must be a number'),
    body('temperature').isFloat({ min: -100, max: 100 }).withMessage('temperature must be a number'),
    body('humidity').isFloat({ min: 0, max: 100 }).withMessage('humidity must be a number'),
    body('ph').isFloat({ min: 0, max: 14 }).withMessage('ph must be a number'),
    body('rainfall').isFloat({ min: 0 }).withMessage('rainfall must be a number'),
  ],
  cropPrediction
);

router.post(
  '/yield',
  protect,
  [
    body('Area').trim().notEmpty().withMessage('Area is required'),
    body('Item').trim().notEmpty().withMessage('Item is required'),
    body('average_rain_fall_mm_per_year').isFloat({ min: 0 }).withMessage('average_rain_fall_mm_per_year must be a number'),
    body('pesticides_tonnes').isFloat({ min: 0 }).withMessage('pesticides_tonnes must be a number'),
    body('avg_temp').isFloat({ min: -100, max: 100 }).withMessage('avg_temp must be a number'),
  ],
  yieldPrediction
);

router.get('/history', protect, getPredictionHistory);

module.exports = router;
