'use strict';

const langCn = require('../lang/cn');
const langEn = require('../lang/en');
const langTw = require('../lang/tw');

module.exports = function *(next) {
  const cookieKey = this.cookies.get('lang') || 'cn';
  var lang;

  switch (cookieKey) {
    case 'cn':
      lang = langCn;
      break;
    case 'en':
      lang = langEn;
      break;
    case 'tw':
      lang = langTw;
      break;
    default:
      lang = langCn;
      break;
  }

  this.request.lang = lang;

  yield next;
};