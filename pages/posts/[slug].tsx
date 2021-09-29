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
import { getViews, hitPath } from '../../libs/analytics';
const handle: string = 'zeyadetman';
interface Props {
	post: IPost;
	isProduction: boolean;
}

export async function getStaticPaths() {
	const postsSlugs = await getPosts();
	const slugs = postsSlugs.map((post) => ({ params: { slug: post.fileName } }));

	return {
		paths: slugs,
		fallback: true,
	};
}

export async function getStaticProps(props: any) {
	const isProduction = process.env.NODE_ENV === 'production';
	const {
		params: { slug },
	} = props;
	if (slug) {
		const post = await getPostBySlug(slug);
		return { props: { post, isProduction } };
	}

	return {};
}

function BlogIndex(props: Props) {
	const { post, isProduction } = props;
	const router = useRouter();
	const [pageVisits, setPageVisits] = useState<number>(0);

	useEffect(() => {
		const updatePathViews = async () => {
			const views: number = await hitPath(post.fileName);
			setPageVisits(views);
		};

		const getPathViews = async () => {
			const views: number = await getViews(post.fileName);
			setPageVisits(views);
		};

		if (post.fileName) {
			if (isProduction) {
				updatePathViews();
			} else {
				getPathViews();
			}
		}
	}, []);


if(typeof window !== 'undefined') {

if (!post) {
		router.push('/404');
	}

}

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
						<Text display="inline">{`${post.data.date}  •  ${
							pageVisits ? `${pageVisits} Views  •  ` : ''
						}`}</Text>
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
