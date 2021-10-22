const withPlugins = require('next-compose-plugins');

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
			'https://upload.wikimedia.org',
		],
	},
};

module.exports = withPlugins([], nextConfig);
