'use strict';

/**
 * 列表页
 */
module.exports = function *() {
  const keyword = this.request.query.q || '';
  const currentPage = this.request.query.p || 1;

  this.render('list', {
    keyword,
    currentPage,
    lang: this.request.lang
  });
};