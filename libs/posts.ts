import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import getConfig from 'next/config';
import { IPost } from '../interfaces/post';
import { site } from '../configs/site';
import { serialize } from 'next-mdx-remote/serialize';
import { mdxOptions } from '../mdxConfig';

type Lang = 'en' | 'ar';
async function getPosts(lang: Lang): Promise<IPost[]> {
	const language = lang || 'en';
	const { serverRuntimeConfig } = getConfig();
	const postsDirectory = path.join(
		serverRuntimeConfig.PROJECT_ROOT,
		`blogs/${language}`
	);
	const filenames = fs.readdirSync(postsDirectory);

	const posts = filenames
		.map(async (filename: string) => {
			if (filename.endsWith('.md')) {
				return null;
			}
			console.log(filename, 'in');
			const filePath = path.join(postsDirectory, filename);
			const fileContents = fs.readFileSync(filePath, 'utf8');
			const { content, data, excerpt } = matter(fileContents, {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				// eslint-disable-next-line
				excerpt: (file: any): void => {
					console.log(file);
					file.excerpt = file.content
						.split('\n')
						.slice(
							0,
							site.post?.excerpt?.noOfLines
								? site.post?.excerpt?.noOfLines + 1
								: 4
						)
						.join(' ');
				},
			});

			return {
				content: await serialize(content, {
					mdxOptions: {
						...mdxOptions,
					},
				}),
				excerpt: await serialize(excerpt),
				data,
				fileName: path.parse(filePath).name,
				slug: path.parse(filePath).name,
				readingTime: readingTime(content),
				locale: language,
			};
		})
		.filter(Boolean);

	const allPosts = await Promise.all(posts);

	// const postsSortedByDate = allPosts.sort(
	// 	(a, b) => +new Date(b.data.date) - +new Date(a.data.date)
	// );

	return allPosts.filter((post) => post?.fileName);
}

async function getPostBySlug(slug: string, lang: Lang): Promise<null | IPost> {
	const posts = await getPosts(lang);
	const post = posts.find(({ fileName }) => slug === fileName);
	return post || null;
}

export { getPosts, getPostBySlug };
