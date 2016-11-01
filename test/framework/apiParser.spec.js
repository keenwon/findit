'use strict';

const koa = require('koa');
const router = require('koa-router')();
const co = require('co');
const fetch = require('node-fetch');
const apiParser = require('../../lib/apiParser');
const logger = require('../../lib/logger');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

describe('apiParser测试', function () {

  before(function () {
    const app = koa();

    logger.register(app);
    app.use(logger.useGlobalLogger());

    router.all('*', apiParser);
    router.get('/success', function *() {
      this.body = 'success';
    });
    router.get('/error', function *() {
      throw new Error('error');
    });

    app.use(router.routes());

    this.server = app.listen(8888);
  });

  after(function () {
    this.server.close();
  });

  it('正常测试', function () {
    return fetch('http://localhost:8888/success')
      .then(response => response.json())
      .should
      .eventually
      .deep
      .equal({
        code: 200,
        message: '',
        data: 'success'
      });
  });

  it('异常测试', function () {
    return fetch('http://localhost:8888/error')
      .then(response => response.json())
      .should
      .eventually
      .deep
      .equal({
        code: 500,
        message: 'error',
        data: {}
      });
  });
});