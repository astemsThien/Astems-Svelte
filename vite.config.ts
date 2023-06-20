import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs'

const config: UserConfig = {
	plugins: [basicSsl(),sveltekit()],
	// plugins: [sveltekit()],
	server:{
		port:7777,
		strictPort: false,
		// https:true,
		https:{
			key:fs.readFileSync('./src/certifcate/splPrikeyPKCS8.pem'),
			cert:fs.readFileSync('./src/certifcate/splCert.pem')
		}
		
	},
	preview:{
		port:4173,
		strictPort:false,
	}
};

export default config;
