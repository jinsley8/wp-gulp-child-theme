/**
 * Gulp Configuration File
 */

const PATHS = {
	styles: {
		src: './assets/src/css/style.scss',
		dest: './',
		watch: './assets/src/css/**/*.scss',
	},
	scripts: {
		vendor: {
			src: './assets/src/js/vendor/**/*.js',
			dest: './assets/dist/js/vendor/',
			watch: './assets/src/js/vendor/*.js',
		},
		custom: {
			src: './assets/src/js/custom/**/*.js',
			dest: './assets/dist/js/custom/',
			watch: './assets/src/js/custom/*.js',
		},
	},
	images: {
		src: './assets/src/img/raw/**/*',
		dest: './assets/dist/img/',
	},
	php: {
		watch: './**/*.php',
	},
};

const OPTIONS = {
	project: {
		url: 'https://wp-gulp-child-theme.local',
		browserAutoOpen: false,
		injectChanges: true,
	},
	styles: {
		sass: {
			expanded: { outputStyle: 'expanded' },
			compressed: { outputStyle: 'compressed' },
		},
		autoprefixer: {
			browsers: ['last 2 version', '> 1%'],
		},
		cleanCSS: {
			compatibility: '*',
			level: {
				1: {
					specialComments: 'all',
					removeEmpty: true,
					removeWhitespace: true,
				},
				2: {
					mergeMedia: true,
					removeEmpty: true,
					removeDuplicateFontRules: true,
					removeDuplicateMediaBlocks: true,
					removeDuplicateRules: true,
					removeUnusedAtRules: false,
				},
			},
		},
	},
	scripts: {
		babel: {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: { browsers: ['last 2 version', '> 1%'] },
					},
				],
			],
		},
		uglify: {
			compress: {
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				unused: true,
				if_return: true,
				join_vars: true,
				drop_console: false,
			},
		},
	},
	imagemin: {
		gifsicle: { interlaced: true },
		mozjpeg: { quality: 75, progressive: true },
		optipng: { optimizationLevel: 4 },
		svgo: {
			plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
		},
	},
	browserSync: {
		watchOptions: {
			ignored: ['node_modules/**', '*.txt'],
			ignoreInitial: true,
		},
		snippetOptions: {
			ignorePaths: ['wp-admin/**'],
		},
	},
};

export { PATHS, OPTIONS };
