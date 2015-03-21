var gulp = require('gulp');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('default', function() {
    //JS
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular/angular.js'
        ])
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/build/js/'));

    //CSS
    gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css'
        ])
    .pipe(uglifycss())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/build/css/'));

});