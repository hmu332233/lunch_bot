const modMenu = require('../models/menu');
const utilSlack = require('../utils/slack');

exports.sendMealsMessage = async ({ month, date, timeCategory }) => {
  const menus = await modMenu.getMeal({ month, date, timeCategory });
  if (!menus) {
    return false;
  }
  await utilSlack.sendMessage({ month, date, timeCategory, description: menus.description });
  return true;
};

exports.sendTodayMealsMessage = ({ timeCategory = 1 }) => {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  return this.sendMealsMessage({ month, date, timeCategory });
};
