import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import getConfig from 'next/config';

async function getPosts() {
	const { serverRuntimeConfig } = getConfig();
	const postsDirectory = path.join(serverRuntimeConfig.PROJECT_ROOT, 'blogs');
	const filenames = fs.readdirSync(postsDirectory);

	const posts = filenames.map((filename: any) => {
		const filePath = path.join(postsDirectory, filename);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const { content, data, excerpt } = matter(fileContents, {
			excerpt: (file: any): any => {
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

export { getPosts };
