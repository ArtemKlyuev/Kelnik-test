'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');

module.exports = function (options) {
    return function () {

        return browserify({
                entries: 'src/js/main.js',
                debug: true,
                transform: [babelify]
            })
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe($.if(!isDev, $.uglify()))
            .pipe($.if(!isDev, $.rev()))
            .pipe(gulp.dest('build/js'))
            .pipe($.if(!isDev, $.rev.manifest('manifest/js.json', {
                base: 'manifest',
                merge: true
            })))
            .pipe($.if(!isDev, gulp.dest('manifest')));
    };
};