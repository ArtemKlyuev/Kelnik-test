'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
const fs = require('fs');
//const bemto = require('bemto.pug').includePaths;

module.exports = function (options) {

	return function () {
		return combiner(
			gulp.src('src/pug/pages/index.pug'),
			$.pug({
				locals: {
					nav: JSON.parse(fs.readFileSync('src/data/navigation.json', 'utf8'))
				},
				pretty: true
			}),
			$.if(!isDev, $.revReplace({
				manifest: gulp.src(['manifest/css.json', 'manifest/js.json'], {
					allowEmpty: true
				})
			})),
			$.if(!isDev, $.htmlmin({
				collapseBooleanAttributes: true,
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true
			})),
			gulp.dest('build')
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'Pug',
				message: err.message
			};
		}));
	};
};