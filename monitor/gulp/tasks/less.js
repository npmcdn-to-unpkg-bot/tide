var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');
var gutil = require("gulp-util");
var watch_list = require('gulp/config').watch_list

var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


gulp.task('less', function () {

    gutil.log('Compile less');

    // Specific less dir to avoid the 'less' dir in dest.
    return gulp.src('./client/css/**/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join(__dirname, '..', '..','app', 'client', 'css', 'includes'), path.join(__dirname, '..', '..','app', 'client', 'js')  ]
        }))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .on('error', function(err){
            gutil.log(err)
            this.emit('end')
        })
        .pipe(gulp.dest('../public/css'));

});

watch_list.push(['client/**/*.less', ['less']])
