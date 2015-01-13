var gulp = require('gulp');
var changed = require('gulp-changed');  // Ignore unchanged files

var srcRoot = './src/';
var buildRoot = './build/';

gulp.task('copyIndex', function() {
    return gulp.src(srcRoot + 'index.html')
        .pipe(changed(buildRoot))
        .pipe(gulp.dest(buildRoot));
});

gulp.task('copyLib', function() {
    return gulp.src(srcRoot + 'js/lib/**')
        .pipe(changed(buildRoot + 'lib'))
        .pipe(gulp.dest(buildRoot + 'lib'));
});

gulp.task('copyAssets', function() {
    return gulp.src(srcRoot + 'res/**')
	.pipe(changed(buildRoot + 'res'))
	.pipe(gulp.dest(buildRoot + 'res'));
});

gulp.task('copy', ['copyIndex', 'copyLib', 'copyAssets']);
