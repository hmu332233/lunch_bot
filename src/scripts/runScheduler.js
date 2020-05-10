require('dotenv').config();

const schedule = require('node-schedule');
const mongoose = require('mongoose');
const { sendTodayMealsMessage } = require('../service/menu');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });
// mongoose.set('debug', true);
const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected');

  const lunchSchedule = schedule.scheduleJob({ hour: 12, minute: 30, dayOfWeek: [1, 2, 3, 4, 5] }, () => {
    sendTodayMealsMessage({ timeCategory: 1 });
  });

  const dinnerSchedule = schedule.scheduleJob({ hour: 18, minute: 30, dayOfWeek: [1, 2, 3, 4, 5] }, () => {
    sendTodayMealsMessage({ timeCategory: 2 });
  });
});
db.on('error', (err) => {
  console.log('DB ERROR:', err);
});
db.once('close', () => {
  console.log('DB closed');
});
