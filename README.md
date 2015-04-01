gulp-filedst
--------

Alternative to gulp.dst(...).

Turns a file to gulp destination:
  
- The destination file is overwritten once per process instance.
- All content of file stream are then appended to destination file, deliminated by "\n".

## Example in coffeescript

    gulp = require 'gulp'
    gulpFileDst = require 'gulp-filedst'
    
    gulp.src './js1/*.js'
    .pipe gulpFileDst './dist/js/all.js'

    gulp.src './js2/*.js'
    .pipe gulpFileDst './dist/js/all.js'
    
    # dist/js/all.js contains all js1/*.js and js2/*.js content, deliminated by \n
