'use strict';

const gulp = require('gulp');

function lazyRequireTask(taskName, path, options = {}) {

	options.taskName = taskName;
	gulp.task(taskName, function (callback) {
		let task = require(path).call(this, options);

		return task(callback);
	});
};

lazyRequireTask('del', './gulp/tasks/del');
lazyRequireTask('sass', './gulp/tasks/sass');
lazyRequireTask('pug', './gulp/tasks/pug');
lazyRequireTask('fetching-data', './gulp/tasks/fetching-data');
lazyRequireTask('scripts', './gulp/tasks/scripts');
lazyRequireTask('img', './gulp/tasks/img');
lazyRequireTask('png-sprites', './gulp/tasks/png-sprites');
lazyRequireTask('serve', './gulp/tasks/serve');
lazyRequireTask('watch', './gulp/tasks/watch');
lazyRequireTask('smart-grid', './gulp/tasks/smart-grid');

gulp.task('dev', gulp.series('del', 'smart-grid', 'png-sprites', gulp.parallel('pug', 'sass', 'img', 'scripts', 'fetching-data'), gulp.parallel('watch', 'serve')));
gulp.task('build', gulp.series('del', 'smart-grid', 'png-sprites', gulp.parallel('scripts', 'img', 'sass', 'fetching-data'), 'pug'));