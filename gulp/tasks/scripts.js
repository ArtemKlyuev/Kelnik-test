'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {

	return function () {

		return combiner(
			gulp.src('src/js/main.js'),
			$.babel(),
			$.if(!isDev, $.uglify()),
			$.if(!isDev, $.rev()),
			gulp.dest('build/js'),
			gulp.src(['node_modules/promise-polyfill/dist/polyfill.min.js', 'node_modules/whatwg-fetch/dist/fetch.umd.js']),
			$.if(!isDev, $.uglify()),
			gulp.dest('build/js'),
			$.if(!isDev, $.rev.manifest('manifest/js.json', {
				base: 'manifest',
				merge: true
			})),
			$.if(!isDev, gulp.dest('manifest'))
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'Scripts',
				message: err.message
			};
		}));


	};

};