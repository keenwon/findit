'use strict';

const koa = require('koa');
const app = koa();
const Pug = require('koa-pug');
const favicon = require('koa-favicon');
const jsonp = require('koa-response-jsonp');
const send = require('koa-send');

const config = require('./config');
const router = require('./router');
const logger = require('./lib/logger');
const lang = require('./lib/lang');
const bodyParser = require('./lib/bodyParser');
const error = require('./lib/error');

// logger
logger.register(app);
app.use(logger.useGlobalLogger());

// exception handler
app.use(error);

// jsonp support
jsonp(app);

// server info
app.use(function *(next) {
  yield next;
  this.set('X-Powered-By', 'findit');
});

// language
app.use(lang);

// view engine
const pug = new Pug({
  viewPath: './sites/views',
  basedir: './sites/views',
  noCache: app.env !== 'production',
  debug: app.env !== 'production',
  app: app
});

// body parser
app.use(bodyParser);

// router
app.use(router.routes());

// static
app.use(function *() {
  yield send(this, this.path, {
    root: __dirname + '/public'
  });
});

// favicon
app.use(favicon('./public/favicon.ico'));

if (require.main === module) {
  // istanbul ignore next
  // 开发&测试环境时覆盖
  app.listen(config['app.port'] || 3000);
} else {
  module.exports = app;
}
