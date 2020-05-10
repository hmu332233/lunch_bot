const { MENU } = require('../../constants');
const mongoose = require('mongoose');

const CONSTANTS = {
  TIME_CATEGORY: MENU.TIME_CATEGORY,
};

const schema = mongoose.Schema({
  month: Number,
  date: Number,
  timeCategory: Number,
  description: String,
  meals: [
    {
      corner: Object,
      texts: [String],
    },
  ],
});

const model = mongoose.model('menu', schema);

module.exports = {
  model,
  CONSTANTS,
};
