'use strict';

const gulp = require('gulp');

module.exports = function (options) {

    return function () {
        return gulp.src('src/data/data.json')
            .pipe(gulp.dest('build/data'));
    };

};