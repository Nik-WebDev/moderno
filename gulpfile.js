let gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    cssmin = require("gulp-cssmin"),
    autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function () {
  return (
    gulp
      .src("app/scss/**/*.scss")
      // compressed - как альтернативное  значение для  outputStyle (сжимает)
      // expanded - как альтернативное значение для outputStyle
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 8 versions"],
          cascade: false,
        })
      )
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task("html", function () {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("script", function () {
  return gulp.src("app/js/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("style", function () {
  return gulp
    .src([
      "node_modules/slick-carousel/slick/slick.css",
      "node_modules/magnific-popup/dist/magnific-popup.css",
      "node_modules/normalize.css/normalize.css",
    ])
    .pipe(concat("libs.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("app/css"));
});

gulp.task("script", function () {
  return gulp
    .src([
      "node_modules/slick-carousel/slick/slick.js",
      "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});

gulp.task("js", function () {
  return gulp.src("app/js/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
});

gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("script"));
});

gulp.task(
  "default",
  gulp.parallel("sass", "style", "script", "js", "browser-sync", "watch")
);
