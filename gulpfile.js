const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

const scss_glob = "src/scss/*.scss";
const js_glob = "src/js/**";
// "dev:start": "node-sass -w scss/ -o dist/css/ --recursive",

gulp.task("sass", function () {
  return gulp
    .src(scss_glob)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest("dist/css"));
});
gulp.task("jscript", function () {
  return gulp
    .src(js_glob)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist/js"));
});

gulp.task("serve", function () {
  browserSync.init({
    server: "dist",
    port: 4019,
  });
});

//Browser Reload Function
gulp.task("reload", function (done) {
  browserSync.reload();
  done();
});
gulp.task("watch", function (done) {
  gulp.watch(scss_glob, gulp.series("sass", "reload"));
  gulp.watch(js_glob, gulp.series("jscript", "reload"));
  done();
});

gulp.task("dev-server", gulp.parallel("serve", "watch"));

gulp.task("hello", function (done) {
  console.log("hello from gulp");
  done();
});
