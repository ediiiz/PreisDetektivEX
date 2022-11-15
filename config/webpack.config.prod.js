'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.prod.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    contentScript: PATHS.src + '/contentScript.js',
    background: PATHS.src + '/background.js',
    branches: PATHS.src + '/branches.js',
    newBranches: PATHS.src + '/newBranches.js',
  },
});

module.exports = config;
