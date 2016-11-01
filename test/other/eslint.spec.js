'use strict';

const lint = require('mocha-eslint');

var paths = [
    'configs',
    'lib',
    'sites',
    '*.js'
];

var options = {
    formatter: 'compact',
    alwaysWarn: false,
    timeout: 10000,
    slow: 1000,
    strict: true
};

lint(paths, options);