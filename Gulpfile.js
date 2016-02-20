var gulp                    = require('gulp');
var jade                    = require('gulp-jade');
var ghPages                 = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});


gulp.task('copy', function () {
  return gulp
    .src(['./public/**/*'])
    .pipe(gulp.dest('dist'));
});

gulp.task('default',['clean', 'copy', 'deploy'], function() {
  return gulp
    .src('./views/*.jade')
    .pipe(jade({}))
    .pipe(gulp.dest('./dist/'))
});
