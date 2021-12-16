const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.mp3$/,
			use: {
				loader: 'file-loader',
				options: {
					publicPath: '/_next/static/sounds/',
					outputPath: 'static/sounds/',
					name: '[name].[ext]',
					esModule: false,
				},
			},
		});
		return config;
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
	images: {
		domains: [
			'/public/static/',
			'/static/',
			'stackoverflow.com',
			'i.imgur.com',
			'upload.wikimedia.org',
		],
	},
	i18n: {
		locales: ['ar', 'en'],
		defaultLocale: 'en',
		localeDetection: true,
	},
	async redirects() {
		return [
			{
				source: '/projects/:projectId',
				destination: 'https://zeyadetman.github.io/:projectId',
				permanent: true,
				basePath: false,
			},
		];
	},
};

module.exports = withPlugins(
	[
		withPWA({
			pwa: {
				dest: 'public',
				runtimeCaching,
			},
		}),
	],
	nextConfig
);
