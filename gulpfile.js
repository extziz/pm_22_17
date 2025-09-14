import { src, dest, watch, series } from "gulp";
import gulpSass from "gulp-sass"
import cssnano from "gulp-cssnano";
import * as saasModule from "sass"
import sourcemaps from "gulp-sourcemaps";
import browserSyncModule from 'browser-sync'
import fileInclude from "gulp-file-include";

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
        .pipe(dest("dist/css"))         
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

