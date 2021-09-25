import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

async function getPosts() {
	const postsDirectory = path.join(process.cwd(), 'blogs');
	const filenames = fs.readdirSync(postsDirectory);

	const posts = filenames.map((filename: any) => {
		const filePath = path.join(postsDirectory, filename);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const { content, data, excerpt } = matter(fileContents, {
			excerpt: (file) => {
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
		(a, b) => new Date(b.data.date) - new Date(a.data.date)
	);
	return postsSortedByDate;
}

export { getPosts };
