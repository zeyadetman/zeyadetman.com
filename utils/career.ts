import { ICareer } from '../interfaces/career';

const careers: ICareer[] = [
	{
		title: 'Front-End Engineer',
		company: 'Blink22',
		// logo: LOGOS.rubikal,
		date: 'Oct 2021 – Present',
		techStack: ['reactjs', 'typescript'],
	},
	{
		title: 'Front-End Engineer',
		company: 'Rubikal',
		// logo: LOGOS.rubikal,
		date: 'Jul 2019 – Oct 2021',
		techStack: [
			'node.js',
			'reactjs',
			'redux',
			'react-redux',
			'mongodb',
			'mongoose',
			'amazon-web-services',
		],
		childs: [
			{
				title: 'Front-End Engineer',
				company: 'Roadtrip Nation',
				// logo: LOGOS.rubikal,
				date: 'Jul 2019 – Oct 2021',
				techStack: [
					'node.js',
					'reactjs',
					'redux',
					'react-redux',
					'mongodb',
					'mongoose',
					'amazon-web-services',
				],
			},
		],
	},
	{
		title: 'Back-End Engineer',
		company: 'Nowpay',
		url: 'https://nowpay.cash/',
		date: 'Nov 2020 – May 2021',
		techStack: [
			'typescript',
			'node.js',
			'sequelize.js',
			'mysql',
			'amazon-web-services',
			'amazon-s3',
			'aws-lambda',
		],
	},
	{
		title: 'Front-End Engineer',
		company: 'Cognitev',
		url: '',
		// logo: LOGOS.cognitev,
		date: 'Jul 2019 – Jun 2020',
		techStack: ['reactjs', 'react-redux', 'node.js', 'sequelize.js', 'cypress'],
	},
	{
		title: 'Front-End Engineer',
		company: 'Bosta',
		url: 'https://www.bosta.co/',
		// logo: LOGOS.bosta,
		date: 'May 2019 – Apr 2020',
		techStack: ['ReactJS'],
		childs: [
			{
				title: 'Front-End Engineer',
				company: 'Lynks',
				url: 'https://lynks.com',
				// logo: LOGOS.lynks,
				date: 'Jan 2019 – May 2019',
				techStack: [
					'reactjs',
					'react-apollo',
					'apollo',
					'apollo-client',
					'graphql',
				],
			},
		],
	},
	// {
	// 	title: 'Front-End Engineer',
	// 	company: 'ArqamFC',
	// 	url: 'https://www.arqamfc.com/',
	// 	// logo: LOGOS.arqamfc,
	// 	date: 'Jun 2018 – Nov 2018',
	// 	techStack: ['ReactJS', 'VueJS', 'ElectronJS'],
	// },
];

export { careers };
