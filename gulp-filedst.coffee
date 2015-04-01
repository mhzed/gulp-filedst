fs = require "fs"
path = require "path"
through = require('through2')
mkdirp = require "mkdirp"

# append stream of files to 'file'
_memory = {}
_init = (fp, cb)->
  if fp of _memory then cb()
  else
    mkdirp path.dirname(fp), (err)->
      if err then return cb(err)
      fs.writeFile fp, "", (err)->
        if err then return cb(err)
        _memory[fp] = 1
        cb()

# alternative to gulp.dst,  append content to the file
module.exports = (dstfile)->

  ret = through.obj (vfile, unused, cb)->
    _init path.resolve(dstfile), (err)->
      if err then return cb(err)
      if vfile.contents.pipe
        dst = fs.createWriteStream(dstfile, {flags:"a"})
        vfile.contents.pipe(dst).on('finish', cb)
      else # buffer
        fs.appendFile dstfile, vfile.contents, (err)->
          fs.appendFile dstfile, "\n", (err)->
            cb()
  ret.resume()
  ret
