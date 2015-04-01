// Generated by CoffeeScript 1.8.0
(function() {
  var fs, mkdirp, path, through, _init, _memory;

  fs = require("fs");

  path = require("path");

  through = require('through2');

  mkdirp = require("mkdirp");

  _memory = {};

  _init = function(fp, cb) {
    if (fp in _memory) {
      return cb();
    } else {
      return mkdirp(path.dirname(fp), function(err) {
        if (err) {
          return cb(err);
        }
        return fs.writeFile(fp, "", function(err) {
          if (err) {
            return cb(err);
          }
          _memory[fp] = 1;
          return cb();
        });
      });
    }
  };

  module.exports = function(dstfile) {
    var ret;
    ret = through.obj(function(vfile, unused, cb) {
      return _init(path.resolve(dstfile), function(err) {
        var dst;
        if (err) {
          return cb(err);
        }
        if (vfile.contents.pipe) {
          dst = fs.createWriteStream(dstfile, {
            flags: "a"
          });
          return vfile.contents.pipe(dst).on('finish', cb);
        } else {
          return fs.appendFile(dstfile, vfile.contents, function(err) {
            return fs.appendFile(dstfile, "\n", function(err) {
              return cb();
            });
          });
        }
      });
    });
    ret.resume();
    return ret;
  };

}).call(this);

//# sourceMappingURL=gulp-filedst.js.map
