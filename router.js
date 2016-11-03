'use strict';

const router = require('koa-router')();

const indexController = require('./sites/controllers/index');
const listController = require('./sites/controllers/list');
const resourceController = require('./sites/controllers/resource');
const helpController = require('./sites/controllers/help');
const declareController = require('./sites/controllers/declare');

/**
 * 列表页
 */
router.get('/:lang/list', listController);

/**
 * 资源页
 */
router.get('/:lang/resource/:infohash', resourceController);

/**
 * 帮助页面
 */
router.get('/:lang/help', helpController);

/**
 * 声明页面
 */
router.get('/:lang/declare', declareController);

/**
 * 首页
 */
router.get('/', indexController);
router.get('/cn', indexController);
router.get('/tw', indexController);
router.get('/en', indexController);

module.exports = router;