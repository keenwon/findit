'use strict';

/**
 * 帮助页
 */
module.exports = function *() {
  this.render('help', {
    lang: this.request.lang
  });
};