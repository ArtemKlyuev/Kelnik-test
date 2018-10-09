'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {

	return function () {
		const spriteData = gulp.src('src/img/sprites/*.png').pipe($.spritesmith({
			imgName: 'sprite.png',
			cssName: '_png-sprite.scss',
			imgPath: '../img/sprite.png'
		}));

		const imgStream = spriteData.img.pipe($.if(!isDev, $.tinypngCompress({
			key: 'JgfDkXf_pbETnWAM_xANz_vq8fzAx_aF',
			summarise: true,
			sigFile: 'src/img/.tinypng-sigs',
			log: true
		})).pipe(gulp.dest('build/img/')));
		const cssStream = spriteData.css.pipe(gulp.dest('src/sass/utilities'));
		return combiner(imgStream, cssStream).on('error', $.notify.onError(function (err) {
			return {
				title: 'PNG sprites',
				message: err.message
			};
		}));
	};
};