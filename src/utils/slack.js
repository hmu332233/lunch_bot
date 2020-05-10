const axios = require('axios');

exports.sendMessage = async ({ month, date, timeCategory, description }) => {
  if (!process.env.SLACK_WEB_HOOK) {
    return false;
  }

  const postData = {
    text: `${month}월 ${date}일 ${timeCategory}\n\n${description}`,
  };

  const res = await axios.post(process.env.SLACK_WEB_HOOK, postData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res && res.data) {
    if (res.data === 'ok') {
      return true;
    }
  }

  return false;
};
