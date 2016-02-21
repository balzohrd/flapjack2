var gulp                    = require('gulp');
var jade                    = require('gulp-jade');
var ghPages                 = require('gulp-gh-pages');
var clean                   = require('gulp-rimraf');
var runSequence             = require('run-sequence');
var bower                   = require('gulp-bower');
var express                 = require("express");
var harp                    = require("harp");
var app                     = express();

gulp.task('bower', function() {
  return bower();
});

gulp.task('server', ['bower'], function(){
  app.use(express.static(__dirname + "/public"));
  app.use(express.static(__dirname + "/dist/bower"));
  app.use(harp.mount(__dirname + "/views"));
  app.listen(3000)

})

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('jade',function() {
  return gulp
    .src('./views/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('copy:assets', function () {
  return gulp
    .src('./public/**/*')
    .pipe(gulp.dest('./dist'));
});


gulp.task('default', function (cb) {
  runSequence(['clean', 'jade', 'copy:assets', 'bower']);
});

// gulp.task(/ );
