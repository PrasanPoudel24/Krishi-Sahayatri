const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['crop', 'yield'],
      required: true,
    },
    input: {
      type: Object,
      required: true,
    },
    result: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Prediction', predictionSchema);
