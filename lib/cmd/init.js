'use strict';

var fs = require('fs')
  , path = require('path')
  , utils = require('../utils');

var done = function(err) {
  if (err) {
    console.error(err);
    return process.exit(0)
  }
  process.exit(0);
};

module.exports = exports = function(opts) {
  var prompt = require('prompt');
  prompt.message = 'init';
  prompt.start();
  prompt.get([
    {
      name: 'name',
      description: 'Directory and project name',
      required: true
    },

    {
      name: 'author',
      description: 'Author name',
      required: true
    }
  ], function(err, results) {
    if (err) return done(err);
    var archetype = path.join(__dirname, '../../archetype');
    console.log(archetype);
    var dir = path.join(process.cwd(), results.name);
    console.log(dir);
    utils.copy(archetype, dir, results, done);
  });

};
