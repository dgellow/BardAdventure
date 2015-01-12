var changed    = require('gulp-changed');
var gulp       = require('gulp');

gulp.task('images', function() {
    var dest = './build/res';

    return gulp.src('./src/res/**')
	.pipe(changed(dest)) // Ignore unchanged files
	.pipe(gulp.dest(dest));
});
