import { ISite } from '../interfaces/configs';

export const site: ISite = {
	name: 'Zeyad Etman',
	description:
		'Technical Blog | mostly about web development, Occasionally software engineering topics.',
	username: 'zeyadetman',
	baseUrl: 'https://zeyadetman.com',
	namespace: 'zeyadetman-blog',
	openToWork: true,
	githubRepo: 'https://github.com/zeyadetman/zeyadetman.com/blob/main',
	email: 'zeyad.etman@gmail.com',
	twitter: {
		username: 'zeyadetman',
	},
	social: {
		linkedin: 'zeyadetman',
		stackoverflow: '5721245',
		github: 'zeyadetman',
	},
	post: {
		excerpt: {
			noOfLines: 3,
		},
	},
};
