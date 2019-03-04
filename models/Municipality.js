const mongoose = require('mongoose');

/**
 * @Schema - Municipality Schema
 */
const muniSchema = mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  yearly: {
    type: Number
  },
  monthly: {
    type: Number
  },
  weekly: {
    type: Number
  },
  daily: {
    type: Number
  }
});

const Municipality = (module.exports = mongoose.model(
  'Municipality',
  muniSchema
));
