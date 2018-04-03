'use strict';

const dot  = require ('dot');
const path = require('path');

/**
 * exports - given a config precache all the templates
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
module.exports = function (config) {
  return dot.process({
      //global: '_page.render',
      //destination: __dirname + '/render',
      path: path.resolve(__dirname, 'templates')
  });
};
