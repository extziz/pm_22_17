import { src, dest, watch, series, parallel } from "gulp";
import gulpSass from "gulp-sass"
import cssnano from "gulp-cssnano";
import * as saasModule from "sass"
import sourcemaps from "gulp-sourcemaps";
import browserSyncModule from 'browser-sync'
import fileInclude from "gulp-file-include";
import rename from "gulp-rename";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";


const sass = gulpSass(saasModule);
const browserSync = browserSyncModule.create();

//html task
function html() {
    return src('app/*.html')           
        .pipe(fileInclude({              
            prefix: '@@',                  
            
            basepath: '@file'              
        }))
        .pipe(dest('dist'));             
}

//scss task
function styles() {
    return src("app/scss/**/*.scss")   
        .pipe(sourcemaps.init())         
        .pipe(sass().on("error", sass.logError))       
        .pipe(cssnano())                 
        .pipe(rename({ suffix: ".min" })) 
        .pipe(sourcemaps.write("."))     
        .pipe(dest("dist/css"));         
}

//js task
function scripts() {
    return src('app/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

//img task
function images(){
      return src('app/img/**/*')
          .pipe(imagemin())
          .pipe(dest('dist/images'));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    notify: false
  });
}

function reload() {
  browserSync.reload();
  
}

function watcher(){
  serve();
  watch("./app/scss/**/*.scss", {events: "change"}, reload)
  watch("./app/*.html", {events: "change"}, reload).addListener("change", reload)
  watch("./app/js/**/*.js", {events: "change"}, reload).addListener("change", reload)
//   watch("./app/images/**/*", series(images, reload));
}


const seriesModule = series(
  html,
  styles,
  scripts,
  images,
  watcher
);
export default seriesModule;


