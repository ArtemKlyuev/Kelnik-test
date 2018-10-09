'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {

	return function () {
		return combiner(
			gulp.src(['src/img/**/*.{png,jpg}', '!src/img/sprites/**'], {
				since: gulp.lastRun('img')
			}),
			$.if(!isDev, $.tinypngCompress({
				key: 'JgfDkXf_pbETnWAM_xANz_vq8fzAx_aF',
				summarise: true,
				sigFile: 'src/img/.tinypng-sigs',
				log: true
			})),
			$.newer('build/img/'),
			gulp.dest('build/img/')
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'IMG',
				message: err.message
			};
		}));
	};

};