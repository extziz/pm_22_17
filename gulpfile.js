import { src, dest, watch, series } from "gulp";
import gulpSass from "gulp-sass";
import cssnano from "gulp-cssnano";
import * as sassModule from "sass";
import sourcemaps from "gulp-sourcemaps";
import browserSyncModule from "browser-sync";
import fileInclude from "gulp-file-include";
import rename from "gulp-rename";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";

const sass = gulpSass(sassModule);
const browserSync = browserSyncModule.create();

// HTML
function html() {
  return src("app/*.html")
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

// SCSS
function styles() {
  return src("app/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return src("app/js/**/*.js")
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

// Images
function images() {
  return src("app/img/**/*")
    .pipe(imagemin())
    .pipe(dest("dist/img"))
    .pipe(browserSync.stream());
}

// BrowserSync
function serve(done) {
  browserSync.init({
    server: { baseDir: "./dist" },
    notify: false,
  });
  done();
}

// Watcher
function watcher() {
  watch("app/scss/**/*.scss", styles);
  watch("app/*.html", html);
  watch("app/js/**/*.js", scripts);
  watch("app/img/**/*", images);
}

// Export tasks
export const build = series(html, styles, scripts, images);
export default series(build, serve, watcher);
