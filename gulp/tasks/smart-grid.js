'use strict';

const smartGrid = require('smart-grid');

module.exports = function (options) {

	return function (cb) {

		const settings = {
			filename: '_smart-grid',
			outputStyle: 'scss',

			columns: 12,

			offset: "30px",
			/* gutter width px || % */
			mobileFirst: false,
			container: {
				maxWidth: '1280px',
				//fields: '0' /* side fields */
			},
			breakPoints: {
				xl: {
					'width': '1600px',
					'fields': '30px'
				},
				lg: {
					'width': '1200px',

					'fields': '30px'
				},
				md: {
					'width': '992px',
					'fields': '15px'
				},
				sm: {
					'width': '768px',
					'fields': '15px'
				},
				xs: {
					'width': '560px',
					'fields': '15px'
				}
			}
		};

		smartGrid('src/sass/utilities', settings);

		cb();
	};
};