/* eslint-disable */
//@ts-nocheck

import { Badge, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useState, useEffect, ReactElement } from 'react';
import { getPostBySlug, getPosts } from '../../libs/posts';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useColorModeValue } from '@chakra-ui/color-mode';
import MarkdownWrapper from '../../components/MarkdownRender';
import { IPost } from '../../interfaces/post';
import { useRouter } from 'next/router';
import { getViews, hitPath } from '../../libs/analytics';
import { site } from '../../configs/site';
import { GetStaticPathsResult } from 'next';
import { TwitterShareButton } from 'react-share';
import { Button } from '@chakra-ui/button';

interface Props {
	post: IPost;
	isProduction: boolean;
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const postsSlugs = await getPosts();
	const slugs = postsSlugs.map((post) => ({
		params: { slug: post?.fileName },
	}));

	return {
		paths: slugs,
		fallback: true,
	};
}

// eslint-disable-next-line
export async function getStaticProps(props: any) {
	const isProduction = process.env.NODE_ENV === 'production';
	const {
		params: { slug },
	} = props;
	if (slug) {
		const post = await getPostBySlug(slug);
		if (post) {
			return { props: { post, isProduction } };
		}
	}

	return {
		notFound: true,
	};
}

function BlogIndex(props: Props): ReactElement {
	const { post, isProduction } = props;
	const router = useRouter();
	const [pagePath, setPagePath] = useState('');
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
	}, [isProduction, post]);

	useEffect(() => {
		if (!post) {
			router.push('/404');
		}

		setPagePath(router.asPath);
	}, [post, router]);

	const renderTags = (tags: [string]) => {
		return tags.map((tag: string) => (
			<Badge size="xs" variant="tag" key={tag}>
				{tag}
			</Badge>
		));
	};

	return (
		<>
			{post && (
				<>
					<NextSeo
						title={post.data.title}
						description={post.excerpt}
						openGraph={{
							images: [
								{
									url: '/static/images/logo.jpeg',
									width: 200,
									height: 200,
									alt: 'Logo',
									type: 'image/jpeg',
								},
							],
						}}
					/>
					<ArticleJsonLd
						url={pagePath}
						title={post.data.title}
						images={[
							{
								url: '/static/images/logo.jpeg',
								width: 200,
								height: 200,
								alt: 'Logo',
								type: 'image/jpeg',
							},
						]}
						datePublished={post.data.date}
						authorName={[site.name]}
						publisherName={site.name}
						publisherLogo=""
						description={post.excerpt || ''}
					/>
					<Stack mb="8">
						<Heading
							as="h1"
							fontSize="4xl"
							color={useColorModeValue('black', 'white')}
						>
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
					<Flex justify="center" mt={16} mb={-8}>
						<TwitterShareButton
							title={post.data.title}
							via={site.twitter.username}
							url={`${site.baseUrl}${router.asPath}`}
						>
							<Button
								bg="#1d9bf0"
								color="#fff"
								_hover={{ bg: '#1e9cf1dd', color: 'fff' }}
								size="sm"
							>
								Tweet This Post
							</Button>
						</TwitterShareButton>
					</Flex>
				</>
			)}
		</>
	);
}

export default BlogIndex;
