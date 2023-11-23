import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = 3003;

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: '../dist',
	},
	envDir: '../',
	plugins: [react()],
	publicDir: '../public',
	root: './src',
	server: { port },
});
