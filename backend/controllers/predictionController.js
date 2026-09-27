const axios = require('axios');
const { validationResult } = require('express-validator');
const Prediction = require('../models/Prediction');

const cropApiUrl = process.env.CROP_API_URL || 'http://127.0.0.1:8001/predict';
const yieldApiUrl = process.env.YIELD_API_URL || 'http://127.0.0.1:8002/predict';

const cropPrediction = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const payload = {
      N: Number(req.body.N),
      P: Number(req.body.P),
      K: Number(req.body.K),
      temperature: Number(req.body.temperature),
      humidity: Number(req.body.humidity),
      ph: Number(req.body.ph),
      rainfall: Number(req.body.rainfall),
    };

    const response = await axios.post(cropApiUrl, payload, {
      timeout: 20000,
    });

    const prediction = await Prediction.create({
      userId: req.user._id,
      type: 'crop',
      input: payload,
      result: response.data,
    });

    return res.status(200).json({
      id: prediction._id,
      type: 'crop',
      input: payload,
      result: response.data,
      createdAt: prediction.createdAt,
    });
  } catch (error) {
    console.error('Crop prediction error:', error.response?.data || error.message);
    const message = error.response?.data?.detail || error.response?.data?.message || 'Crop prediction failed';
    return res.status(error.response?.status || 500).json({ message });
  }
};

const yieldPrediction = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const payload = {
      Area: req.body.Area,
      Item: req.body.Item,
      average_rain_fall_mm_per_year: Number(req.body.average_rain_fall_mm_per_year),
      pesticides_tonnes: Number(req.body.pesticides_tonnes),
      avg_temp: Number(req.body.avg_temp),
    };

    const response = await axios.post(yieldApiUrl, payload, {
      timeout: 20000,
    });

    const prediction = await Prediction.create({
      userId: req.user._id,
      type: 'yield',
      input: payload,
      result: response.data,
    });

    return res.status(200).json({
      id: prediction._id,
      type: 'yield',
      input: payload,
      result: response.data,
      createdAt: prediction.createdAt,
    });
  } catch (error) {
    console.error('Yield prediction error:', error.response?.data || error.message);
    const message = error.response?.data?.detail || error.response?.data?.message || 'Yield prediction failed';
    return res.status(error.response?.status || 500).json({ message });
  }
};

const getPredictionHistory = async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.status(200).json({ predictions });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching prediction history' });
  }
};

module.exports = { cropPrediction, yieldPrediction, getPredictionHistory };
