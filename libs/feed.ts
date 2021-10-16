import { Feed } from 'feed';
import { site } from '../configs/site';
import { IPost } from '../interfaces/post';
import fs from 'fs';

export const generateRSSFeed = (articles: IPost[]): void => {
	const baseUrl = site.baseUrl;
	const author = {
		name: site.name,
		email: site.email,
		link: `https://twitter.com/${site.twitter.username}`,
	};

	const feed = new Feed({
		title: `Articles by ${site.name}`,
		description:
			'Technical Blog | mostly about web development, Occasionally software engineering topics.',
		id: baseUrl,
		link: baseUrl,
		language: 'en',
		feedLinks: {
			rss2: `${baseUrl}/rss.xml`,
		},
		author,
		copyright: 'zeyadetman',
	});

	// Add each article to the feed
	articles.forEach((post) => {
		const {
			content,
			fileName,
			excerpt,
			data: { date, title },
		} = post;
		const url = `${baseUrl}/posts/${fileName}`;

		feed.addItem({
			//eslint-disable-next-line
			//@ts-ignore
			title: title || 'No Title',
			id: url,
			link: url,
			description: excerpt,
			content,
			author: [author],
			//eslint-disable-next-line
			//@ts-ignore
			date: date ? new Date(date) : new Date(),
		});
	});

	fs.writeFileSync('public/rss.xml', feed.rss2());
};
