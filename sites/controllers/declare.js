'use strict';

/**
 * 声明页
 */
module.exports = function *() {
  this.render('declare', {
    lang: this.request.lang
  });
};