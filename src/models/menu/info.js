const mongoose = require('mongoose');

const CONSTANTS = {
  TIME_CATEGORY: {
    BREAKFAST: 0,
    LUNCH: 1,
    DINNER: 2,
  },
};

const schema = mongoose.Schema({
  month: Number,
  day: Number,
  timeCategory: String,
  description: String,
  meals: [
    {
      corner: String,
      texts: [String],
    },
  ],
});

const model = mongoose.model('menu', schema);

module.exports = {
  model,
  CONSTANTS,
};
