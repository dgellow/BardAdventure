var watchify     = require('watchify');
var browserify   = require('browserify');
var factor       = require('factor-bundle');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');
var gulp         = require('gulp');
var source       = require('vinyl-source-stream');

var shell = require('gulp-shell');

gulp.task('browserify', function() {
    // Directories
    var rootDir = __dirname.split('/').slice(0, -2).join('/');
    var sourceDir = rootDir + '/src/js/';
    var buildDir = rootDir + '/build/js/';

    // Files to bundle
    var files = ['init'];
    var entryFiles = files.map(function(f) {
        return sourceDir + f + '.js';
    });
    var outputFiles = files.map(function(f) {
        return buildDir + f + '.js';
    });

    // Bundle arguments
    var browserifyArgs = {
        // needed by watchify
        cache: {}, packageCache: {}, fullPaths: true,
        // browserify args
	entries: entryFiles, debug: true
    };

    var b = browserify(browserifyArgs);
    var bundler = global.isWatching ?
                  watchify(b) :
                  b;

    var bundle = function() {
        bundleLogger.start();

	return bundler
            .plugin(factor, {
                entries: entryFiles,
                o: outputFiles
            })
            .bundle()
	    .on('error', handleErrors)
	    .pipe(source('common.js'))
	    .pipe(gulp.dest(buildDir))
	    .on('end', bundleLogger.end);
    };

    if(global.isWatching) {
	bundler.on('update', bundle);
    }

    return bundle();
});
