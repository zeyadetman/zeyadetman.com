const withPlugins = require('next-compose-plugins');

const nextConfig = {
	webpack: (config, options) => {
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
		domains: ['/public/static/', '/static/'],
	},
};

module.exports = withPlugins([], nextConfig);
