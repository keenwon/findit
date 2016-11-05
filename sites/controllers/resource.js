'use strict';

/**
 * 资源页
 */
module.exports = function *() {
  this.render('resource', {
    lang: this.request.lang
  });
};