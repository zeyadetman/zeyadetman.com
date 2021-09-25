const withPlugins = require('next-compose-plugins');
const imageminMozjpeg = require('imagemin-mozjpeg');
const optimizedImages = require('next-optimized-images');

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
};

module.exports = withPlugins(
	[
		[
			optimizedImages,
			{
				// these are the default values so you don't have to provide them if they are good enough for your use-case.
				// but you can overwrite them here with any valid value you want.
				inlineImageLimit: 8192,
				imagesFolder: 'images',
				imagesName: '[name]-[hash].[ext]',
				handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
				removeOriginalExtension: false,
				optimizeImages: true,
				optimizeImagesInDev: true,
				mozjpeg: {
					quality: 80,
				},
				optipng: {
					optimizationLevel: 3,
				},
				pngquant: false,
				gifsicle: {
					interlaced: true,
					optimizationLevel: 3,
				},
				svgo: {
					// enable/disable svgo plugins here
				},
				webp: {
					preset: 'default',
					quality: 75,
				},
			},
		],
	],
	nextConfig
);
