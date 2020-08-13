const _ = require('lodash');
const axios = require('axios');

exports.sendMessage = async ({ month, date, timeCategory, menu }) => {
  if (!process.env.SLACK_WEB_HOOK) {
    return false;
  }

  const title = `${month}월 ${date}일 ${timeCategory}`;

  const menuBlocks = menu.meals.map((meal) => {
    const corner = meal.corner.text;
    const menuText = meal.texts.map((text) => `- ${text}`).join('\n');
    return {
      type: 'mrkdwn',
      text: `*${corner}*\n${menuText}`,
    };
  });

  const menuBlockGroups = _.chain(menuBlocks)
    .reduce((result, value, key) => {
      const newKey = Math.floor(key / 2);
      (result[newKey] || (result[newKey] = [])).push(value);
      return result;
    }, {})
    .values()
    .value();

  const sections = menuBlockGroups.map((group) => {
    return {
      type: 'section',
      fields: group,
    };
  });

  const postData = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${title}*\n<fakeLink.toEmployeeProfile.com|전체 식단 보기 (준비 중)>`,
        },
      },
      {
        type: 'divider',
      },
      ...sections,
    ],
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
