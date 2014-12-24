var gulp = require('gulp')
  , jade = require('gulp-jade')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , concat = require('gulp-concat')
  , imagemin = require('gulp-imagemin')
  , livereload = require('gulp-livereload')
  , lr = require('tiny-lr')
  , server = lr()
  , webserver = require('gulp-connect');

gulp.task('stylus', function() {
  gulp.src(['./assets/static/css/*.styl',
            '!./assets/static/css/_*.styl'])
    .pipe(stylus({
      'include css': true,
      use: nib()
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./site/static/css/'))
    .pipe(webserver.reload());
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
    .pipe(webserver.reload());
});

gulp.task('js', function() {
  gulp.src(['./assets/static/js/**/*.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./site/static/js'))
    .pipe(webserver.reload());;
});

gulp.task('images', function() {
  gulp.src('./assets/static/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./site/static/img'))
    .pipe(webserver.reload());
});

gulp.task('fonts', function() {
  gulp.src('./assets/static/fonts/**/*')
    .pipe(gulp.dest('./site/static/fonts'))
    .pipe(webserver.reload());
});

gulp.task('webserver', function () {
  webserver.server({
    root: './site/',
    livereload: true
  });
});

gulp.task('watch', ['stylus', 'jade', 'js', 'images', 'fonts', 'webserver'], function() {
  server.listen(9000, function(err) {
    if (err) return console.log(err);

    gulp.watch('assets/static/css/**/*.styl', ['stylus']);
    gulp.watch('assets/views/**/*.jade', ['jade']);
    gulp.watch('assets/static/js/**/*', ['js']);
    gulp.watch('assets/static/img/**/*', ['images']);
    gulp.watch('assets/static/fonts/**/*', ['images']);
  });

});