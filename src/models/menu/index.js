const { model: db, CONSTANTS } = require('./info');

exports.createMeals = (meals) => {
  return db.create(meals);
};

exports.getMeal = ({ month, date, timeCategory = CONSTANTS.TIME_CATEGORY.LUNCH }) => {
  return db.findOne({ month, date, timeCategory }).lean();
};
