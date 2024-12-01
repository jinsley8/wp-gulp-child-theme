/**
 * Gulpfile for WordPress theme development
 */

import { PATHS, OPTIONS } from './gulp.config.mjs';

// Core
import gulp from 'gulp';

// Utilities
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import fancyLog from 'fancy-log';
import beep from 'beepbeep';
import rename from 'gulp-rename';
import filter from 'gulp-filter';
import sourcemaps from 'gulp-sourcemaps';
import lineec from 'gulp-line-ending-corrector';
import cache from 'gulp-cache';
import size from 'gulp-size';

// CSS related
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import mmq from 'gulp-merge-media-queries';

// JS related
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';

// Image related
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

// Logging utility
const logger = {
	task: (name) => fancyLog(`Starting '${name}' task`),
	error: (error) => fancyLog.error(`Error in ${error.task}: ${error.message}`),
	size: (name, details) => fancyLog(`${name}: ${details}`),
};

// Error handler
const errorHandler = (taskName) => {
	return plumber({
		errorHandler: (error) => {
			logger.error({
				task: taskName,
				message: error.message,
				fileName: error.fileName || 'unknown file',
			});
			beep();
			notify.onError({
				title: `Error in ${taskName}`,
				message: error.message,
				sound: false,
			})(error);
			this.emit('end');
		},
	});
};

// Size reporter
const reportSize = (title) =>
	size({
		title: `${title}:`,
		gzip: true,
		pretty: true,
	});

// BrowserSync
const serve = (done) => {
	browserSync.init({
		proxy: OPTIONS.project.url,
		open: OPTIONS.project.browserAutoOpen,
		injectChanges: OPTIONS.project.injectChanges,
		...OPTIONS.browserSync,
	});
	done();
};

const reload = (done) => {
	browserSync.reload();
	done();
};

// Styles task
gulp.task('styles', () => {
	logger.task('styles');
	return gulp
		.src(PATHS.styles.src, { allowEmpty: true })
		.pipe(errorHandler('styles'))
		.pipe(sourcemaps.init())
		.pipe(sass(OPTIONS.styles.sass.expanded).on('error', sass.logError))
		.pipe(autoprefixer()) // Remove the BROWSERS_LIST option
		.pipe(sourcemaps.write('./'))
		.pipe(lineec())
		.pipe(gulp.dest(PATHS.styles.dest))
		.pipe(filter('**/*.css'))
		.pipe(mmq())
		.pipe(browserSync.stream())
		.pipe(rename({ suffix: '.min' }))
		.pipe(cleanCSS(OPTIONS.styles.cleanCSS))
		.pipe(reportSize('CSS'))
		.pipe(gulp.dest(PATHS.styles.dest))
		.pipe(
			notify({
				title: 'Styles',
				message: 'Task completed',
				onLast: true,
			})
		);
});

// Vendor JS task
gulp.task('vendorJS', () => {
	logger.task('vendorJS');
	return gulp
		.src(PATHS.scripts.vendor.src)
		.pipe(errorHandler('vendorJS'))
		.pipe(babel(OPTIONS.scripts.babel))
		.pipe(uglify(OPTIONS.scripts.uglify))
		.pipe(lineec())
		.pipe(rename({ suffix: '.min' }))
		.pipe(reportSize('Vendor JS'))
		.pipe(gulp.dest(PATHS.scripts.vendor.dest))
		.pipe(
			notify({
				title: 'Vendor JS',
				message: 'Task completed',
				onLast: true,
			})
		);
});

// Custom JS task
gulp.task('customJS', () => {
	logger.task('customJS');
	return gulp
		.src(PATHS.scripts.custom.src)
		.pipe(errorHandler('customJS'))
		.pipe(babel(OPTIONS.scripts.babel))
		.pipe(uglify(OPTIONS.scripts.uglify))
		.pipe(lineec())
		.pipe(rename({ suffix: '.min' }))
		.pipe(reportSize('Custom JS'))
		.pipe(gulp.dest(PATHS.scripts.custom.dest))
		.pipe(
			notify({
				title: 'Custom JS',
				message: 'Task completed',
				onLast: true,
			})
		);
});

// Images task
gulp.task('images', () => {
	logger.task('images');
	return gulp
		.src(PATHS.images.src)
		.pipe(errorHandler('images'))
		.pipe(
			cache(
				imagemin([
					gifsicle(OPTIONS.imagemin.gifsicle),
					mozjpeg(OPTIONS.imagemin.mozjpeg),
					optipng(OPTIONS.imagemin.optipng),
					svgo(OPTIONS.imagemin.svgo),
				])
			)
		)
		.pipe(reportSize('Images'))
		.pipe(gulp.dest(PATHS.images.dest))
		.pipe(
			notify({
				title: 'Images',
				message: 'Task completed',
				onLast: true,
			})
		);
});

// Clear cache task
gulp.task('clearCache', (done) => {
	logger.task('clearCache');
	return cache.clearAll(done);
});

// Watch task
const watch = () => {
	logger.task('watch');
	gulp.watch(PATHS.styles.watch, gulp.series('styles'));
	gulp.watch(PATHS.scripts.vendor.watch, gulp.series('vendorJS', reload));
	gulp.watch(PATHS.scripts.custom.watch, gulp.series('customJS', reload));
	gulp.watch(PATHS.images.src, gulp.series('images', reload));
	gulp.watch(PATHS.php.watch, gulp.series(reload));
};

// Default task
gulp.task('default', gulp.parallel('styles', 'vendorJS', 'customJS', 'images', serve, watch));

// Build task
gulp.task('build', gulp.parallel('styles', 'vendorJS', 'customJS', 'images'));
