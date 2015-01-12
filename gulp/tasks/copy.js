var gulp = require('gulp');

gulp.task('copyIndex', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
});

gulp.task('copyPages', function() {
    return gulp.src('src/pages/**')
        .pipe(gulp.dest('build/pages'));
});

gulp.task('copy', ['copyIndex', 'copyPages']);
