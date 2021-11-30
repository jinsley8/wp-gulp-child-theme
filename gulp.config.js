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

// Project options.

// Local project URL of your already running WordPress site.
// Could be something like "wp-gulp-child-theme.local" or "localhost"
// depending upon your local WordPress setup.
const projectURL = "wp-gulp-child-theme.local";

// Theme/Plugin URL. Leave it like it is; since our gulpfile.js lives in the root folder.
const productURL = "./";
const browserAutoOpen = false;
const injectChanges = true;

// >>>>> Style options.
// Path to main .scss file.
const styleSRC = "./assets/src/css/style.scss";

// Path to place the compiled CSS file. Default set to root folder.
const styleDestination = "./";

// Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
const outputStyle = "compact";
const errLogToConsole = true;
const precision = 10;

// JS Vendor options.
// Path to JS vendor folder.
const jsVendorSRC = "./assets/src/js/vendor/*.js";

// Path to place the compiled JS vendors file.
const jsVendorDestination = "./assets/dist/js/";

// Compiled JS vendors file name. Default set to vendors i.e. vendors.js.
const jsVendorFile = "vendor";

// JS Custom options.
// Path to JS custom scripts folder.
const jsCustomSRC = "./assets/src/js/custom/*.js";

// Path to place the compiled JS custom scripts file.
const jsCustomDestination = "./assets/dist/js/";

// Compiled JS custom file name. Default set to custom i.e. custom.js.
const jsCustomFile = "custom";

// Images options.
// Source folder of images which should be optimized and watched.
// > You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
const imgSRC = "./assets/src/img/raw/**/*";

// Destination folder of optimized images.
// > Must be different from the imagesSRC folder.
const imgDST = "./assets/dist/img/";

// >>>>> Watch files paths.
// Path to all *.scss files inside css folder and inside them.
const watchStyles = "./assets/src/css/**/*.scss";

// Path to all vendor JS files.
const watchJsVendor = "./assets/src/js/vendor/*.js";

// Path to all custom JS files.
const watchJsCustom = "./assets/src/js/custom/*.js";

// Path to all PHP files.
const watchPhp = "./**/*.php";

// Browsers you care about for auto-prefixing. Browserlist https://github.com/ai/browserslist
// The following list is set as per WordPress requirements. Though; Feel free to change.
const BROWSERS_LIST = ["last 2 version", "> 1%"];

// Export.
module.exports = {
	projectURL,
	productURL,
	browserAutoOpen,
	injectChanges,
	styleSRC,
	styleDestination,
	outputStyle,
	errLogToConsole,
	precision,
	jsVendorSRC,
	jsVendorDestination,
	jsVendorFile,
	jsCustomSRC,
	jsCustomDestination,
	jsCustomFile,
	imgSRC,
	imgDST,
	watchStyles,
	watchJsVendor,
	watchJsCustom,
	watchPhp,
	BROWSERS_LIST,
};
