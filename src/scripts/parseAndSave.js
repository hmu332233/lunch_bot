const { parse } = require('../utils/parser');

const path = __dirname + '/../../data/menu.pdf';
parse(path).then(console.log);
