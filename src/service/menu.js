const modMenu = require('../models/menu');
const utilSlack = require('../utils/slack');
const utilParser = require('../utils/parser');

exports.sendMealsMessage = async ({ month, date, timeCategory }) => {
  const menu = await modMenu.getMeal({ month, date, timeCategory });
  if (!menu) {
    await utilSlack.sendEmptyMessage({ month, date, timeCategory: utilParser.toTimeText(timeCategory), menu });
    return false;
  }
  await utilSlack.sendMessage({ month, date, timeCategory: utilParser.toTimeText(timeCategory), menu });
  return true;
};

exports.sendTodayMealsMessage = ({ timeCategory = 1 }) => {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  return this.sendMealsMessage({ month, date, timeCategory });
};
