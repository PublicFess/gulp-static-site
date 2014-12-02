var lr = require('tiny-lr')
  , gulp = require('gulp')
  , jade = require('gulp-jade')
  , stylus = require('gulp-stylus')
  , concat = require('gulp-concat')
  , nib = require('nib')
  , livereload = require('gulp-livereload')
  , webserver = require('gulp-webserver')
  , server = lr();

gulp.task('stylus', function() {
  gulp.src(['./assets/public/css/*.styl',
            '!./assets/public/css/_*.styl'])
    .pipe(stylus({
      use: nib()
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./site/public/css/'))
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
  gulp.src(['./assets/public/js/**/*.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./site/public/js'))
    .pipe(livereload(server));
});

gulp.task('http-server', function() {
  gulp.src('site/html')
    .pipe(webserver({
      livereload: true,
      port: 9000
    }));
  console.log('Server listening on http://localhost:9000');
});

gulp.task('watch', function() {
  // Предварительная сборка проекта
  gulp.run('stylus');
  gulp.run('jade');
  gulp.run('js');

  // Подключаем Livereload
  server.listen(35729, function(err) {
    if (err) return console.log(err);

    gulp.watch('public/stylus/**/*.styl', function() {
      gulp.run('stylus');
    });
    gulp.watch('views/**/*.jade', function() {
      gulp.run('jade');
    });

    gulp.watch('public/js/**/*', function() {
      gulp.run('js');
    });
  });
  gulp.run('http-server');
});