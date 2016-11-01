'use strict';

const koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const serve = require('../../lib/static');
const logger = require('../../lib/logger');

const config = require('../../config');
const staticPathPrefix = config['static.pathPrefix'];

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

describe('static测试', function () {

  before(function () {
    const app = koa();

    // 带上logger, 提高下覆盖
    logger.register(app);
    app.use(logger.useGlobalLogger());

    router.get('/app.js', function *(next) {
      this.body = 'app.js';
      yield next;
    });

    router.get(`${staticPathPrefix}/app.js`, function *(next) {
      this.body = '/static/app.js';
      yield next;
    });

    app.use(router.routes());

    app.use(serve());

    this.server = app.listen(8888);
  });

  after(function () {
    this.server.close();
  });

  it('资源存在', function (done) {
    fetch(`http://localhost:8888${staticPathPrefix}/package.json`)
      .then(response => {
        response.ok.should.be.equal(true);
        done();
      });
  });

  it('资源不存在', function (done) {
    fetch(`http://localhost:8888${staticPathPrefix}/keenwon.test.json`)
      .then(response => {
        response.ok.should.be.equal(false);
        done();
      });
  });

  it('path已被router处理', function (done) {
    fetch('http://localhost:8888/app.js')
      .then(response => response.text())
      .then(data => {
        data.should.be.equal('app.js');
        done();
      });
  });

  it('资源被router拦截', function (done) {
    fetch(`http://localhost:8888${staticPathPrefix}/app.js`)
      .then(response => response.text())
      .then(data => {
        data.should.be.equal('/static/app.js');
        done();
      });
  });

  it('正常的404不被static处理', function (done) {
    fetch('http://localhost:8888/asdf')
      .then(response => {
        response.ok.should.be.equal(false);
        response.status.should.be.equal(404);
        done();
      });
  });

});