var fs = require('fs-extra')
  , path = require('path')
  , async = require('async')
  , _ = require('underscore');

exports.copy = function(src, dst, data, cb) {
  fs.stat(src, function(err, stat) {
    if (err) return cb(err);
    if (stat.isDirectory()) {
      return fs.ensureDir(dst, function(err) {
        if (err) return cb(err);
        fs.readdir(src, function(err, files) {
          if (err) return cb(err);
          async.each(files, function(file, cb) {
            exports.copy(path.join(src, file), path.join(dst, file), data, cb);
          }, cb);
        });
      });
    } else if (stat.isFile())
      exports.compileFile(src, dst, data, cb);
  });
};

exports.compileFile = function(src, dst, data, cb) {
  fs.readFile(src, 'utf-8', function(err, text) {
    if (err) return cb(err);
    var compiled = _.template(text)(data);
    fs.writeFile(dst, compiled, 'utf-8', cb);
  });
};
