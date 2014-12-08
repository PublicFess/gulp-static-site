var lr = require('tiny-lr')
  , gulp = require('gulp')
  , jade = require('gulp-jade')
  , stylus = require('gulp-stylus')
  , concat = require('gulp-concat')
  , imagemin = require('gulp-imagemin')
  , nib = require('nib')
  , livereload = require('gulp-livereload')
  , webserver = require('gulp-webserver')
  , server = lr();

gulp.task('stylus', function() {
  gulp.src(['./assets/static/css/*.styl',
            '!./assets/static/css/_*.styl'])
    .pipe(stylus({
      use: nib()
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./site/static/css/'))
    .pipe(livereload(server));
});

gulp.task('jade', function() {
  gulp.src(['./assets/views/**/*.jade',
            '!./assets/views/**/_*.jade',
            '!./assets/views/**/layout.jade'])
    .pipe(jade({
      pretty: true
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./site/html/'))
    .pipe(livereload(server));
});

gulp.task('js', function() {
  gulp.src(['./assets/static/js/**/*.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./site/static/js'))
    .pipe(livereload(server));
});

gulp.task('images', function() {
  gulp.src('./assets/public/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./site/public/img'))
});

gulp.task('http-server', function() {
  gulp.src('site/html')
    .pipe(webserver({
      livereload: true,
      port: 9000
    }));
  console.log('Server listening on http://localhost:9000');
});

gulp.task('watch',['stylus', 'jade', 'js', 'images', 'http-server'], function() {
  server.listen(35729, function(err) {
    if (err) return console.log(err);

    gulp.watch('assets/static/stylus/**/*.styl', ['stylus']);
    gulp.watch('assets/views/**/*.jade', ['jade']);
    gulp.watch('assets/static/js/**/*', ['js']);
    gulp.watch('assets/static/img/**/*', ['images']);
  });

});