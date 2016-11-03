'use strict';

const router = require('koa-router')();

const indexController = require('./sites/controllers/index');
const listController = require('./sites/controllers/list');
const resourceController = require('./sites/controllers/resource');
const helpController = require('./sites/controllers/help');
const declareController = require('./sites/controllers/declare');

/**
 * 首页
 */
router.get('/', indexController);

/**
 * 列表页
 */
router.get('/list', listController);

/**
 * 资源页
 */
router.get('/resource/:infohash', resourceController);

/**
 * 帮助页面
 */
router.get('/help', helpController);

/**
 * 声明页面
 */
router.get('/declare', declareController);

module.exports = router;