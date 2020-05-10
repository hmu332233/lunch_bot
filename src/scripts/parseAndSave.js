require('dotenv').config();

const mongoose = require('mongoose');
const { parse } = require('../utils/parser');
const modMenu = require('../models/menu');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected');
  const path = __dirname + '/../../data/menu.pdf';
  parse(path)
    .then((meals) => {
      console.log(meals);
      return modMenu.createMeals(meals);
    })
    .then(() => {
      db.close();
    });
});
db.on('error', (err) => {
  console.log('DB ERROR:', err);
});
db.once('close', () => {
  console.log('DB closed');
});
