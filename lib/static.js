'use strict';

const _ = require('lodash');
const send = require('koa-send');
const config = require('../config');

const root = config['static.root'];
const pathPrefix = config['static.pathPrefix'];

var defaultOptions = {
  root: root,
  pathPrefix: pathPrefix,
  maxage: 5 * 60 * 1000,
  index: 'index.html'
};

module.exports = function (options = {}) {

  _.defaultsDeep(options, defaultOptions);

  return function *(next) {
    yield next;

    if (this.body || this.status !== 404) {
      return;
    }

    var path;

    if (this.path.indexOf(options.pathPrefix) !== 0) {
      return;
    }

    path = this.path.replace(options.pathPrefix, '');

    yield send(this, path, options);
  };
};