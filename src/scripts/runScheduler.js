require('dotenv').config();

const mongoose = require('mongoose');
const { sendTodayMealsMessage } = require('../service/menu');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });
// mongoose.set('debug', true);
const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected');
  sendTodayMealsMessage({}).then(() => {
    db.close();
  });
});
db.on('error', (err) => {
  console.log('DB ERROR:', err);
});
db.once('close', () => {
  console.log('DB closed');
});
