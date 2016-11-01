'use strict';

const rimraf = require('rimraf');
const koa = require('koa');
const fetch = require('node-fetch');
const request = require('../../lib/request');
const proxyquire = require('proxyquire').noPreserveCache();

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const logDir = '/tmp/toaweblog';
const options = {
  headers: {
    host: 'one.pingan.com'
  }
};

const stubs1 = {
  '../config': {
    'log.enable': false,
    '@global': true
  }
};

const stubs2 = {
  '../config': {
    'log.enable': true,
    'log.path': logDir,
    'log.maxsize': null,
    '@global': true
  }
};

const stubs3 = {
  '../config': {
    'log.enable': true,
    'log.global.enable': false,
    '@global': true
  }
};

describe('Logger Proxy测试', function () {

  afterEach(function () {
    this.server && this.server.close();
    try {
      rimraf.sync(logDir);
    } catch (error) {
      // do nothing
    }
  });

  it('日志关闭', function () {
    const app = koa();
    const logger1 = proxyquire('../../lib/logger', stubs1);

    logger1.register(app);
    app.use(logger1.useGlobalLogger());

    app.use(function *() {
      this.body = '123';
    });

    this.server = app.listen(8888);

    return fetch('http://localhost:8888', options)
      .then(response => response.text())
      .should
      .eventually
      .equal('123');
  });

  it('日志开启, 日志目录不存在, 不限制文件大小', function () {
    const app = koa();
    const logger2 = proxyquire('../../lib/logger', stubs2);

    logger2.register(app);
    app.use(logger2.useGlobalLogger());

    app.use(function *() {
      this.body = '123';
    });

    this.server = app.listen(8888);

    return fetch('http://localhost:8888', options)
      .then(response => response.text())
      .should
      .eventually
      .equal('123');
  });

  it('日志开启, 全局日志关闭', function () {
    const app = koa();
    const logger3 = proxyquire('../../lib/logger', stubs3);

    logger3.register(app);
    app.use(logger3.useGlobalLogger());

    app.use(function *() {
      this.body = '123';
    });

    this.server = app.listen(8888);

    return fetch('http://localhost:8888', options)
      .then(response => response.text())
      .should
      .eventually
      .equal('123');
  });

});