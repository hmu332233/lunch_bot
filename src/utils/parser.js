const fs = require('fs');
const { menuPdfParser } = require('welstory-menu-pdf-parser');

exports.parseToModel = (meals) => {
  return meals;
};

exports.parsePdf = (path) => {
  const file = fs.readFileSync(path);
  return menuPdfParser(file);
};

exports.parse = async (path) => {
  const pdfData = await this.parsePdf(path);
  return this.parseToModel(pdfData);
};
