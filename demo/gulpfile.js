const gulp = require('gulp')
const connect = require('gulp-connect')

gulp.task('connect', function () {
  connect.server()
})
gulp.task('default', ['connect'])

var bro = require('gulp-bro')
gulp.task('build', () =>
  gulp.src('js/script.js')
    .pipe(bro())
    .pipe(gulp.dest('js_dist'))
)

gulp.watch('js/*.js', ['build'])
