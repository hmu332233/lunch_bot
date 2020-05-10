const fs = require('fs');
const { menuPdfParser } = require('welstory-menu-pdf-parser');

const {
  MENU: { TIME_CATEGORY },
} = require('../constants');

exports.toTimeCategory = (text) => {
  switch (text) {
    case '조식':
      return TIME_CATEGORY.BREAKFAST;
    case '중식':
      return TIME_CATEGORY.LUNCH;
    case '석식':
      return TIME_CATEGORY.DINNER;
  }
};

exports.parseToModel = (meals) => {
  return meals.map((meal) => {
    return {
      month: meal.startDateTime.getMonth() + 1,
      date: meal.startDateTime.getDate(),
      timeCategory: this.toTimeCategory(meal.mealName),
      description: meal.description,
      meals: meal.meals,
    };
  });
};

exports.parsePdf = (path) => {
  const file = fs.readFileSync(path);
  return menuPdfParser(file);
};

exports.parse = async (path) => {
  const pdfData = await this.parsePdf(path);
  return this.parseToModel(pdfData);
};
