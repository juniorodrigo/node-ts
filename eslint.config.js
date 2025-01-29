// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	{
		files: ['**/*.ts', '**/*.js'], // Aplica a TypeScript y JavaScript
		languageOptions: {
			parser: '@typescript-eslint/parser', // Usa el parser de TypeScript
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
			prettier: require('eslint-plugin-prettier'),
		},
		rules: {
			...prettierConfig.rules,
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': 'warn', // Avisos para variables no usadas
			'no-console': 'warn', // Avisos para console.log
		},
	},
];
