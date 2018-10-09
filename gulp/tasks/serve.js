'use strict';

const bs = require('browser-sync').create();

module.exports = function (options) {

	return function () {
		bs.init({
			server: {
				baseDir: './build'
			},
			open: false,
			plugins: [{
				module: "bs-html-injector",
				options: {
					file: "./build/index.html"
				}
			}]
		});
		return bs.watch('build/**/*.*').on('change', bs.reload);
	};
};