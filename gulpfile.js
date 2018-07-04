var gulp = require('gulp');
var runSequence = require('run-sequence');
var protractor = require('gulp-protractor').protractor;
var taskListing = require('gulp-task-listing');
var webdriver_update = require('gulp-protractor').webdriver_update_specific;
var combine = require('istanbul-combine');


gulp.task('generate_coverage1', function () {
    var opts = {
        dir: 'cireports/codecoverage/pack1',
        pattern: 'cireports/reporters/*.json',
        print: 'none',
        reporters: {
            html: {}
        }
    };
    combine.sync(opts);
});

/*

gulp.task('webdriver_update', webdriver_update({
    webdriverManagerArgs: ['--ignore_ssl']
}));
*/

gulp.task('protractor', function() {
    var configFile = './conf/conf.js';

    return gulp
        .src(['./test_spec/*.js'])
        .pipe(protractor({
            configFile: configFile
        })).on('error', function (e) {
            console.log(e)
        })
});
gulp.task('test:e2e', function(callback) {
    runSequence(
        'protractor',
        'generate_coverage1',
        callback
    );
});

gulp.task('default', taskListing);