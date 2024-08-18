/**
 * Gulpfile.
 *
 * Gulp with WordPress.
 *
 * Implements:
 *      1. Live reloads browser with BrowserSync.
 *      2. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *         CSS minification, and Merge Media Queries.
 *      3. JS: Concatenates & uglifies Vendor and Custom JS files.
 *      4. Images: Minifies PNG, JPEG, GIF and SVG images.
 *      5. Watches files for changes in CSS or JS.
 *      6. Watches files for changes in PHP.
 *      7. Corrects the line endings.
 *      8. InjectCSS instead of browser page reload.
 *
 */

/**
 * Load Gulp Configuration.
 *
 */
import config from './gulp.config.mjs';

/**
 * Load Plugins.
 *
 * Load gulp plugins and passing them semantic names.
 */
import gulp from 'gulp'; // Gulp of-course.

// CSS related plugins.
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer'; // Autoprefixing magic.
import mmq from 'gulp-merge-media-queries'; // Combine matching media queries into one.

import * as dartSass from 'sass';
// import dartSass from 'sass';
import gulpSass from 'gulp-sass'; // Gulp plugin for Sass compilation.

// JS related plugins.
import uglify from 'gulp-uglify'; // Minifies JS files.
import babel from 'gulp-babel'; // Compiles ESNext to browser compatible JS.

// Image related plugins.
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'; // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related plugins.
import rename from 'gulp-rename'; // Renames files E.g. style.css -> style.min.css.
import lineec from 'gulp-line-ending-corrector'; // Consistent Line Endings for non UNIX systems.
import filter from 'gulp-filter'; // Enables you to work on a subset of the original files by filtering them using a glob.
import sourcemaps from 'gulp-sourcemaps'; // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css).
import notify from 'gulp-notify'; // Sends message notification to you.
import browserSync from 'browser-sync'; // Reloads browser and injects CSS. Time-saving synchronized browser testing.
import cache from 'gulp-cache'; // Cache files in stream for later use.
import remember from 'gulp-remember'; //  Adds all the files it has ever seen back into the stream.
import plumber from 'gulp-plumber'; // Prevent pipe breaking caused by errors from gulp plugins.
import beep from 'beepbeep';
import fancyLog from 'fancy-log';

// Sass
const sass = gulpSass(dartSass);

/**
 * Custom Error Handler.
 */
const errorHandler = () => {
	return plumber({
		errorHandler: (error) => {
			fancyLog.error(`\n\n❌  ===> ERROR: ${error.message}\n`);
			beep();
		},
	});
};

const log = (message) => {
	fancyLog(message);
};

// Task names
const TASKS = {
	STYLES: 'styles',
	MINIFY_STYLES: 'minifyStyles',
	VENDORS_JS: 'vendorsJS',
	CUSTOM_JS: 'customJS',
	IMAGES: 'images',
	CLEAR_CACHE: 'clearCache',
	WATCH: 'watch',
};

/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 *
 * {@link http://www.browsersync.io/docs/options/}
 *
 * @param {*} done Done.
 */
const browsersync = (done) => {
	browserSync.init({
		proxy: config.projectURL,
		open: config.browserAutoOpen,
		injectChanges: config.injectChanges,
		watchOptions: {
			ignored: '*.txt',
		},
	});
	done();
};

// Helper function to allow browser reload with Gulp 4.
const reload = (done) => {
	browserSync.reload();
	done();
};

/**
 * Task: `styles`.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it and generates style.css
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates style.min.css
 *    7. Injects CSS or reloads the browser via browserSync
 */
gulp.task('styles', () => {
	log('\n\n✨ ===> Running STYLES task...\n');
	return gulp
		.src(config.styleSRC, { allowEmpty: true })
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: config.outputStyle }).on('error', sass.logError))
		.pipe(sourcemaps.write({ includeContent: false }))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(autoprefixer(config.BROWSERS_LIST))
		.pipe(sourcemaps.write('./'))
		.pipe(lineec()) // Consistent Line Endings for non UNIX systems.
		.pipe(gulp.dest(config.styleDestination))
		.pipe(filter('**/*.css')) // Filtering stream to only css files.
		.pipe(mmq({ log: true })) // Merge Media Queries only for .min.css version.
		.pipe(browserSync.stream()) // Reloads style.css if that is enqueued.
		.pipe(notify({ message: '\n\n✅  ===> STYLES — completed!\n', wait: true, onLast: true }));
});

gulp.task('minifyStyles', () => {
	log('\n\n✨ ===> Running STYLES Minification task...\n');
	return gulp
		.src(config.styleDestination + '*.css')
		.pipe(plumber(errorHandler))
		.pipe(filter(['*', '!*.min.css'])) // Exclude already minified files
		.pipe(rename({ suffix: '.min' }))
		.pipe(
			cleanCSS(config.outputStyleMin, (details) => {
				console.log(`${details.name}: ${details.stats.originalSize}`);
				console.log(`${details.name}: ${details.stats.minifiedSize}`);
			})
		)
		.pipe(lineec())
		.pipe(gulp.dest(config.styleDestination))
		.pipe(browserSync.stream())
		.pipe(notify({ message: '\n\n✅  ===> STYLES Minification — completed!\n', onLast: true }));
});

/**
 * Task: `vendorsJS`.
 *
 * Concatenate and uglify vendor JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS vendor files
 *     2. Concatenates all the files and generates vendors.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifes/Minifies the JS file and generates vendors.min.js
 */
gulp.task('vendorsJS', () => {
	log('\n\n✨ ===> Running VENDORS JS task...\n');
	return gulp
		.src(config.jsVendorSRC, { since: gulp.lastRun('vendorsJS') })
		.pipe(plumber(errorHandler))
		.pipe(
			babel({
				presets: [['@babel/preset-env', { targets: { browsers: config.BROWSERS_LIST } }]],
			})
		)
		.pipe(uglify())
		.pipe(lineec())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(config.jsVendorDestination))
		.pipe(notify({ message: '\n\n✅  ===> VENDOR JS — completed!\n', onLast: true }));
});

/**
 * Task: `customJS`.
 *
 * Concatenate and uglify custom JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS custom files
 *     2. Concatenates all the files and generates custom.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifes/Minifies the JS file and generates custom.min.js
 */
gulp.task('customJS', () => {
	log('\n\n✨ ===> Running CUSTOM JS task...\n');
	return gulp
		.src(config.jsCustomSRC, { since: gulp.lastRun('customJS') })
		.pipe(plumber(errorHandler))
		.pipe(
			babel({
				presets: [['@babel/preset-env', { targets: { browsers: config.BROWSERS_LIST } }]],
			})
		)
		.pipe(uglify())
		.pipe(lineec())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(config.jsCustomDestination))
		.pipe(notify({ message: '\n\n✅  ===> CUSTOM JS — completed!\n', onLast: true }));
});

/**
 * Task: `images`.
 *
 * Minifies PNG, JPEG, GIF and SVG images.
 *
 * This task does the following:
 *     1. Gets the source of images raw folder
 *     2. Minifies PNG, JPEG, GIF and SVG images
 *     3. Generates and saves the optimized images
 *
 * This task will run only once, if you want to run it
 * again, do it with the command `gulp images`.
 *
 * Read the following to change these options.
 *
 * {@link https://github.com/sindresorhus/gulp-imagemin}
 */
gulp.task('images', () => {
	log('\n\n✨ ===> Running IMAGES task...\n');
	return gulp
		.src(config.imgSRC)
		.pipe(
			cache(
				imagemin([
					gifsicle({ interlaced: true }),
					mozjpeg({ quality: 75, progressive: true }),
					optipng({ optimizationLevel: 4 }), // 0- 7 low-high.
					svgo({
						plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
					}),
				])
			)
		)
		.pipe(gulp.dest(config.imgDST))
		.pipe(notify({ message: '\n\n✅  ===> IMAGES — completed!\n', onLast: true }));
});

/**
 * Task: `clear-images-cache`.
 *
 * Deletes the images cache. By running the next "images" task,
 * each image will be egenerated.
 */
gulp.task('clearCache', function (done) {
	log('\n\n✨ ===> Running CLEAR CACHE task...\n');
	return cache.clearAll(done);
});

/**
 * Task: `watch`.
 *
 * Watch tasks for changes
 */
const watch = () => {
	log('\n\n✨ ===> Watching for changes...\n');
	gulp.watch(config.watchPhp, gulp.series(reload));
	gulp.watch(config.watchStyles, gulp.series(TASKS.STYLES, TASKS.MINIFY_STYLES));
	gulp.watch(config.watchJsVendor, gulp.series(TASKS.VENDORS_JS, reload));
	gulp.watch(config.watchJsCustom, gulp.series(TASKS.CUSTOM_JS, reload));
	gulp.watch(config.imgSRC, gulp.series(TASKS.IMAGES, reload));
};

/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task(
	'default',
	gulp.parallel(TASKS.STYLES, TASKS.MINIFY_STYLES, TASKS.VENDORS_JS, TASKS.CUSTOM_JS, TASKS.IMAGES, browsersync, watch)
);
