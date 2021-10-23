import { ISite } from '../interfaces/configs';

export const site: ISite = {
	name: 'Zeyad Etman',
	description:
		'Technical Blog | mostly about web development, Occasionally software engineering topics.',
	username: 'zeyadetman',
	baseUrl: 'https://zeyadetman.com',
	namespace: 'zeyadetman-blog',
	openToWork: true,
	email: 'zeyad.etman@gmail.com',
	twitter: {
		username: 'zeyadetman',
	},
	post: {
		excerpt: {
			noOfLines: 3,
		},
	},
};
