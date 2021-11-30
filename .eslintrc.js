module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
		jquery: true,
	},
	extends: [
		"plugin:@wordpress/eslint-plugin/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		// Disable weird WP spacing rules.
		// 'space-before-function-paren': 'off',
		// 'space-in-parens': 'off',
		// 'array-bracket-spacing': 'off',
		indent: ["error", "tab"],
		semi: ["error", "always"],
		quotes: ["error", "single"],
		"linebreak-style": ["error", "unix"],
		"no-unused-vars": ["warn"],
		"no-console": "off",
		"prettier/prettier": "warn",
	},
};
