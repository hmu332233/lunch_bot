const { model: db, CONSTANTS } = require('./info');

exports.createMeals = (meals) => {
  return db.create(meals);
};

exports.getMeal = ({ month, day, timeCategory = CONSTANTS.TIME_CATEGORY.LUNCH }) => {
  return db.findOne({ month, day, timeCategory }).lean();
};
