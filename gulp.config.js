/* eslint-disable quotes */
/* eslint-disable no-undef */

/**
 * WPGulp Configuration File
 *
 * 1. Edit the variables as per your project requirements.
 * 2. In paths you can add <<glob or array of globs>>.
 *
 * @package
 */

module.exports = {
	// Project options.
	projectURL: "https://wp-gulp-child-theme.local/", // Local project URL of your already running WordPress site.
	productURL: "./", // Theme URL. Leave it like it is, since gulpfile.js lives in the root folder.
	browserAutoOpen: false,
	injectChanges: true,

	// Style options.
	styleSRC: "./assets/src/css/style.scss", // Path to main .scss file.
	styleDestination: "./", // Path to place the compiled CSS file. Default set to root folder.
	outputStyle: "compact", // Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
	errLogToConsole: true,
	precision: 10,

	// JS Vendor options.
	jsVendorSRC: "./assets/src/js/vendor/*.js", // Path to JS vendor folder.
	jsVendorProcessDest: "./assets/src/js/", // Path to place the processed JS vendors file.
	jsVendorDestination: "./assets/dist/js/", // Path to place the compiled JS vendors file.
	jsVendorFile: "vendor", // Compiled JS vendors file name. Default set to vendors i.e. vendors.js.

	// JS Custom options.
	jsCustomSRC: "./assets/src/js/custom/*.js", // Path to JS custom scripts folder.
	jsCustomProcessDest: "./assets/src/js/", // Path to place the processed JS custom scripts file.
	jsCustomDestination: "./assets/dist/js/", // Path to place the compiled JS custom scripts file.
	jsCustomFile: "custom", // Compiled JS custom file name. Default set to custom i.e. custom.js.

	// Images options.
	imgSRC: "./assets/src/img/raw/**/*", // Source folder of images which should be optimized and watched. You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
	imgDST: "./assets/dist/img/", // Destination folder of optimized images. Must be different from the imagesSRC folder.

	// Watch files paths.
	watchStyles: "./assets/src/css/**/*.scss", // Path to all *.scss files inside css folder and inside them.
	watchJsVendor: "./assets/src/js/vendor/*.js", // Path to all vendor JS files.
	watchJsCustom: "./assets/src/js/custom/*.js", // Path to all custom JS files.
	watchPhp: "./**/*.php", // Path to all PHP files.

	// Browsers you care about for autoprefixing. Browserlist https://github.com/ai/browserslist
	// The following list is set as per WordPress requirements. Though, Feel free to change.
	BROWSERS_LIST: [
		"last 2 version",
		"> 1%",
		"ie >= 11",
		"last 1 Android versions",
		"last 1 ChromeAndroid versions",
		"last 2 Chrome versions",
		"last 2 Firefox versions",
		"last 2 Safari versions",
		"last 2 iOS versions",
		"last 2 Edge versions",
		"last 2 Opera versions",
	],
};
