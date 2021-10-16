import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import getConfig from 'next/config';
import { IPost } from '../interfaces/post';

async function getPosts(): Promise<IPost[]> {
	const { serverRuntimeConfig } = getConfig();
	const postsDirectory = path.join(serverRuntimeConfig.PROJECT_ROOT, 'blogs');
	const filenames = fs.readdirSync(postsDirectory);

	const posts = filenames.map((filename: string) => {
		const filePath = path.join(postsDirectory, filename);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const { content, data, excerpt } = matter(fileContents, {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// eslint-disable-next-line
			excerpt: (file: any): void => {
				file.excerpt = file.content.split('\n').slice(0, 4).join(' ');
			},
		});

		return {
			content,
			excerpt,
			data,
			fileName: path.parse(filePath).name,
			readingTime: readingTime(content),
		};
	});

	const postsSortedByDate = posts.sort(
		(a, b) => +new Date(b.data.date) - +new Date(a.data.date)
	);

	return postsSortedByDate;
}

async function getPostBySlug(slug: string): Promise<null | IPost> {
	const posts = await getPosts();
	const post = posts.find(({ fileName }) => slug === fileName);
	return post || null;
}

export { getPosts, getPostBySlug };
