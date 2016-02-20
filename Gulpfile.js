var gulp                    = require('gulp');
var jade                    = require('gulp-jade');
var ghPages                 = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('copy', function () {
  return gulp
    .src(['./public/**/*'])
    .pipe(gulp.dest('dist'));
});


gulp.task('default',['copy', 'deploy'], function() {
  return gulp
    .src('./views/*.jade')
    .pipe(jade({}))
    .pipe(gulp.dest('./dist/'))
});
