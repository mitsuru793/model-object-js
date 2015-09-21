gulp = require 'gulp'
loadPlugins = require 'gulp-load-plugins'
$ = loadPlugins()
runSequence = require 'run-sequence'
watchify = require 'watchify'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'

mainJsName  = 'character'
srcPath     = './src'
destPath    = './dist'

src =
  coffee: '/coffee'
  js:     '/js'

dest =
  js:  '/js'

for key, value of src
  src[key] = srcPath + value

for key, value of dest
  dest[key] = destPath + value

gulp.task 'test-coffee:compile', ->
  gulp.src "test/coffee/**/*.coffee"
    .pipe $.plumber()
    .pipe $.coffee()
    .pipe $.rename extname: '.js'
    .pipe gulp.dest "test/js"

gulp.task 'coffee:compile', ->
  gulp.src "#{src.coffee}/**/*.coffee"
    .pipe $.plumber()
    .pipe $.coffee()
    .pipe $.rename extname: '.js'
    .pipe gulp.dest src.js

gulp.task 'js:bundle', ->
  bundler = watchify browserify(cache: {}, packageCache: {})
  bundler.add(src.js + "/#{mainJsName}.js")
  bundle = ->
    bundler.bundle()
      .on 'error', (err) ->
        console.log err.message
        @.emit 'end'
      .pipe source('bundle.js')
      .pipe buffer()
      .pipe $.uglify()
      .pipe $.rename "#{mainJsName}.min.js"
      .pipe gulp.dest("#{destPath}/js/")
  bundler.on 'update', bundle
  bundle()

gulp.task 'watch', ->
  gulp.watch ["#{src.coffee}/**/*.coffee"], ['coffee:compile']
  gulp.watch ["test/coffee/**/*.coffee"], ['test-coffee:compile']

gulp.task 'build', ->
  runSequence(
    'coffee:compile'
    'js:bundle'
    'test-coffee:compile'
  )

gulp.task 'default', ->
  runSequence(
    'build'
    'watch'
  )
