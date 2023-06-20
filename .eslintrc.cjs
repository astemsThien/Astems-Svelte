module.exports = {
	parserOptions: {
	  ecmaVersion: 2019,
	  sourceType: 'module'
	},
	env: {
	  es6: true,
	  browser: true
	},
	plugins: [
	  'svelte3'
	],
	overrides: [
	  {
		files: ['*.svelte'],
		processor: 'svelte3/svelte3'
	  }
	],
	rules: {
		"no-mixed-spaces-and-tabs": 0, // disable rule
	},
	settings: {
	  // ...
	}
  };
