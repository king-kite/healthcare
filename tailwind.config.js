/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	corePlugins: {
		preflight: false,
	},
	mode: 'jit',
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#e8fdfb',
					100: '#b9f8f2',
					200: '#74f1e5',
					300: '#2eead8',
					400: '#12baa9',
					500: '#0d877a',
					600: '#07463f',
					700: '#021715',
				},
				secondary: {
					50: '#d9d9d9',
					100: '#b3b3b3',
					200: '#8c8c8c',
					300: '#666666',
					400: '#404040',
					500: '#1a1a1a',
					600: '#0d0d0d',
					700: '#000000',
				},
			},
			screens: {
				xs: '400px',
				sm: '580px',
				md: '768px',
				lg: '992px',
				xl: '1200px',
				'2xl': '1500px',
			},
		},
	},
	variants: {
		animation: ['responsive', 'motion-safe', 'motion-reduce'],
		backgroundColor: ['responsive', 'odd', 'hover', 'focus', 'even', 'active'],
		borderWidth: ['responsive', 'hover', 'focus'],
		fontSize: ['responsive', 'hover', 'focus'],
		extend: {},
		position: ['responsive'],
	},
	plugins: [],
};
