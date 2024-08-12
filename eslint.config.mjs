import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { fixupConfigRules } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: [
			'**/node_modules',
			'assets/dist/',
			'**/vendor/**/*',
			'**/*.min.js',
			'**/gulp.config.js',
			'**/gulpfile.js',
		],
	},
	...fixupConfigRules(...compat.extends('plugin:@wordpress/eslint-plugin/recommended', 'plugin:prettier/recommended')),
	{
		plugins: {
			prettier,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jquery,
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		settings: {
			'import/resolver': {
				node: true,
			},
		},
		rules: {
			'prettier/prettier': 'warn',
			'no-unused-vars': ['warn'],
			'no-console': 'off',
			'@wordpress/no-wp-process-env': 'off',
		},
	},
];
