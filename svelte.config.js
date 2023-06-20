import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({
		postcss: true,
	  }),
	],
	kit: {
		// adapter: adapter(),
		adapter: adapter({ out: './build' }),
		alias:{
			// $root:'src',
			// $lib:'./src/lib'
		},
		files:{
			assets:'static',
			hooks:{
				client:'./src/hooks.client',
				server:'./src/hooks.server'
			},
			lib:'./src/lib',
			routes:'./src/routes',
			appTemplate:'./src/app.html'
		},
		inlineStyleThreshold:0,
		moduleExtensions:['.js', '.ts'],
		outDir:'.svelte.kit',
		paths:{
			assets:'',
			base:''
		},
		csrf: {
			checkOrigin: false,
		  }
	}
};

export default config;
