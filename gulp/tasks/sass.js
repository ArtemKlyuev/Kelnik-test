'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;


module.exports = function (options) {

	return function () {
		return combiner(
			gulp.src('src/sass/main.scss'),
			$.if(isDev, $.sourcemaps.init()),
			$.sass(),
			$.autoprefixer({
				browsers: ['last 5 versions'],
				cascade: false
			}),
			$.groupCssMediaQueries(),
			$.if(!isDev, $.cssnano()),
			$.if(!isDev, $.rev()),
			$.if(isDev, $.sourcemaps.write()),
			gulp.dest('build/css'),
			$.if(!isDev, $.rev.manifest('manifest/css.json', {
				base: 'manifest',
				merge: true
			})),
			$.if(!isDev, gulp.dest('manifest'))
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'Sass',
				message: err.message
			};
		}));

	};
};