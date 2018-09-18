const gulp = require("gulp")
const connect = require("gulp-connect")
const bro = require("gulp-bro")
const runSequence = require("run-sequence")

gulp.task("default", function(callback) {
  runSequence("build", "connect", callback)
})

gulp.task("connect", function() {
  connect.server()
})

gulp.task("build", () =>
  gulp
    .src("js/script.js")
    .pipe(bro())
    .pipe(gulp.dest("js_dist"))
)

gulp.watch("js/*.js", ["build"])
