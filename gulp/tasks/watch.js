'use strict';

const gulp = require('gulp');

module.exports = function (options) {

	return function () {
		gulp.watch('src/sass/**/*.{sass,scss}', gulp.series('sass'));
		gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
		gulp.watch('src/js/**/*.js', gulp.series('scripts'));
	};

};