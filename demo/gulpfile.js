var gulp = require('gulp');
connect = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server();
});
 
gulp.task('default', ['connect']);

gulp.task('default', () =>
  gulp.watch('js/*.js', ['build'])
)

var bro = require('gulp-bro');

gulp.task('build', () =>
 gulp.src('js/script.js')
   .pipe(bro())
   .pipe(gulp.dest('js_dist'))
)
