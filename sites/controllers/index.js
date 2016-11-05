'use strict';

/**
 * 首页
 */
module.exports = function *() {
  this.render('index', {
    lang: this.request.lang
  });
};