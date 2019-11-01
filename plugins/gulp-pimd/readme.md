# gulp-pimd

Markdown to HTML with [`PIMD`](https://github.com/hagenburger/pimd)

## Install

```
npm install --save-dev gulp-pimd
```

## Usage

```js
const gulp = require("gulp")
const gulpPimdPlugin = require("gulp-pimd")

gulp.task("default", () =>
  gulp
    .src("intro.md")
    .pipe(gulpPimdPlugin())
    .pipe(gulp.dest("dist"))
)
```

## License

MIT © [Nico Hagenburger](https://www.livingstyleguide.org)
