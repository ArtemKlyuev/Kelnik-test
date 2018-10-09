'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return function () {
        return gulp.src('src/pug/components/fetching_data.pug')
            .pipe($.pug())
            .pipe(gulp.dest('build/fetching_data'))
    };

};