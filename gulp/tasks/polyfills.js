'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {

	return function () {

		return combiner(
			gulp.src(['node_modules/promise-polyfill/dist/polyfill.min.js', 'node_modules/whatwg-fetch/dist/fetch.umd.js']),
			gulp.dest('build/js')
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'Scripts',
				message: err.message
			};
		}));


	};

};