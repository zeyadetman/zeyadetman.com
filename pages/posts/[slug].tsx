import {
	Badge,
	Flex,
	Heading,
	HStack,
	Stack,
	Text,
	Divider,
} from '@chakra-ui/layout';
import React, { useState, useEffect } from 'react';
import { getPostBySlug, getPosts } from '../../libs/posts';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useColorModeValue } from '@chakra-ui/color-mode';
import MarkdownWrapper from '../../components/MarkdownRender';
import { IPost } from '../../interfaces/post';
import { useRouter } from 'next/router';
import { google } from 'googleapis';
const handle: string = 'zeyadetman';
interface Props {
	post: IPost;
}

export async function getStaticPaths() {
	console.log(
		process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID,
		process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_SECRET_KEY
	);
	const oauth2Client = new google.auth.OAuth2(
		process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID,
		process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_SECRET_KEY,
		'http://localhost:3000/oauth2callback'
	);

	const scopes = 'https://www.googleapis.com/auth/analytics';

	// const data = await oauth2Client.generateAuthUrl({
	// 	client_id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID,
	// 	scope: scopes,
	// 	prompt: 'consent',
	// 	access_type: 'offline',
	// });

	// const tokens = {
	// 	access_token:
	// 		'ya29.a0ARrdaM9yKQSAUIUHOwCo3QQnc5Ob9J3G-6lnRYlzfNmqVG5MdSkyGhhjQylx9rUHToQvyq4aU5o6K4BlJYscaMVBGKbTIga1cv3lyXClArS0KNvS_QyGf9E1AvQ-FKhhG8Et76abm6XOx51vHBlcbSsWWpQo',
	// 	scope: 'https://www.googleapis.com/auth/analytics',
	// 	token_type: 'Bearer',
	// 	expiry_date: 1632846438889,
	// };

	// const aa = await oauth2Client.getRequestHeaders();
	// console.log(aa);
	// const data = await oauth2Client.getAccessToken();

	// console.log({ data });

	const postsSlugs = await getPosts();
	const slugs = postsSlugs.map((post) => ({ params: { slug: post.fileName } }));

	return {
		paths: slugs,
		fallback: true,
	};
}

export async function getStaticProps(props: any) {
	console.log({ props });

	const {
		params: { slug },
	} = props;
	if (slug) {
		const post = await getPostBySlug(slug);
		return { props: { post } };
	}

	return {};
}

function BlogIndex(props: Props) {
	const at =
		'ya29.a0ARrdaM9yKQSAUIUHOwCo3QQnc5Ob9J3G-6lnRYlzfNmqVG5MdSkyGhhjQylx9rUHToQvyq4aU5o6K4BlJYscaMVBGKbTIga1cv3lyXClArS0KNvS_QyGf9E1AvQ-FKhhG8Et76abm6XOx51vHBlcbSsWWpQo';
	const { post } = props;
	const router = useRouter();
	const [pageVisits, setPageVisits] = useState(null);
	if (!post) {
		router.push('/404');
		return <></>;
	}

	useEffect(() => {
		const getPagesVisits = async () => {
			const url = `https://www.googleapis.com/analytics/v3/data/ga?access_token=${at}&ids=ga%3A193840106&dimensions=ga%3ApagePath&metrics=ga%3Apageviews&start-date=2018-01-01&end-date=2021-09-29`;
			const { rows } = await (await fetch(url)).json();
			const visitsNumber = rows.reduce((a: number, c: string[]) => {
				return c[0].includes(post.fileName) ? a + Number(c[1]) : +a;
			}, 0);
			setPageVisits(visitsNumber);
		};

		getPagesVisits();
	}, []);

	const renderTags = (tags: [string]) => {
		return tags.map((tag: string) => (
			<Badge size="xs" variant="tag">
				{tag}
			</Badge>
		));
	};

	return (
		<>
			<NextSeo title={post.data.title} description={post.excerpt} />
			<ArticleJsonLd
				url={router.asPath}
				title={post.data.title}
				images={[]}
				datePublished={post.data.date}
				authorName={['Zeyad Etman']}
				publisherName="Zeyad Etman"
				publisherLogo=""
				description={post.excerpt || ''}
			/>
			<Stack mb="8">
				<Heading as="h1" fontSize="4xl">
					{post.data.title}
				</Heading>
				<Flex
					fontSize="xs"
					color={useColorModeValue('gray.500', 'gray.500')}
					flexWrap="wrap"
					css={{ gap: '0.3rem 1rem' }}
				>
					<Text>
						<Text display="inline">{`${post.data.date}  •  ${pageVisits}  •  `}</Text>
						{post.readingTime.text}
					</Text>
					{post.data.tags.length ? (
						<HStack>{renderTags(post.data.tags)}</HStack>
					) : null}
				</Flex>
			</Stack>
			<MarkdownWrapper content={post.content} />
			<Divider my="8" />
			<Flex justify="center">
				<a
					className="twitter-share-button"
					href={`https://twitter.com/intent/tweet?text=${post.data.title}&via=${handle}`}
				>
					Tweet
				</a>
			</Flex>
		</>
	);
}

export default BlogIndex;
