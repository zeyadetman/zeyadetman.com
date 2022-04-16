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
import { TwitterShareButton } from 'react-share';
import { Button } from '@chakra-ui/button';
import Newsletter from '../../components/Newsletter';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useTranslations } from 'use-intl';
import { AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai';
import Icon from '@chakra-ui/icon';
import { trackEvent } from '../../libs/gtag';
import { EVENTS, EVENTS_CATEGORIES } from '../../utils/events';

interface Props {
	post: IPost;
	isProduction: boolean;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const arPosts = await getPosts('ar');
	const enPosts = await getPosts('en');
	const slugs = [...arPosts, ...enPosts].map((post, index) => ({
		params: { slug: post?.fileName },
		locale: index < arPosts.length ? 'ar' : 'en',
	}));

	return {
		paths: slugs,
		fallback: false,
	};
};

export async function getStaticProps(
	props: GetStaticPropsContext
): Promise<GetStaticPropsResult> {
	const isProduction = process.env.NODE_ENV === 'production';
	const {
		params: { slug },
		locale,
	} = props;
	const messages = await import(`/messages/${locale}.json`);

	if (slug) {
		const post = await getPostBySlug(slug, locale);
		if (post) {
			return {
				props: { post, isProduction, messages: JSON.stringify(messages) },
			};
		}

		return {
			notFound: true,
			messages: JSON.stringify(messages),
		};
	}

	return {
		notFound: true,
		messages: JSON.stringify(messages),
	};
}

function BlogIndex(props: Props): ReactElement {
	const { post, isProduction } = props;
	const router = useRouter();
	const [pageVisits, setPageVisits] = useState<number>(0);
	const t = useTranslations('Post');

	useEffect(() => {
		if (!post) {
			router.push('/404');
		}
	}, [post]);

	useEffect(() => {
		if (post) {
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
		}
	}, [isProduction, post]);

	const renderTags = (tags: [string]) => {
		return tags.map((tag: string) => (
			<Badge size="xs" variant="tag" key={tag} ms="0 !important">
				{tag}
			</Badge>
		));
	};

	return (
		<>
			{post && (
				<>
					<NextSeo
						title={`${post.data.title}`}
						description={post.excerpt}
						canonical={`${site.baseUrl}/${router.locale}${router.asPath}`}
						openGraph={{
							url: `${site.baseUrl}/${router.locale}${router.asPath}`,
							title: `${post.data.title}`,
							description: post.excerpt,
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
						url={`${site.baseUrl}/${router.locale}${router.asPath}`}
						title={`${post.data.title}`}
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
							fontWeight="extrabold"
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
								<HStack flexWrap="wrap" display="flex" css={{ gap: '5px' }}>
									{renderTags(post.data.tags)}
								</HStack>
							) : null}
						</Flex>
					</Stack>
					<MarkdownWrapper content={post.content} />
					<Flex justify="center" direction="column" mt={16} mb={-8}>
						<Flex justify="center" direction="row" style={{ gap: '0 8px' }}>
							<TwitterShareButton
								title={post.data.title}
								via={site.twitter.username}
								url={`${site.baseUrl}/${router.locale}${router.asPath}`}
								key="twitter-share-button"
							>
								<Button
									bg="#1d9bf0"
									color="#fff"
									_hover={{ bg: '#1e9cf1dd', color: '#fff' }}
									size="sm"
									key="twitter"
								>
									<Icon as={AiOutlineTwitter} me={1} mb={0.5} fontSize="lg" />
									{t('tweetIt')}
								</Button>
							</TwitterShareButton>

							<div>
								<Button
									key="github-edit-button"
									size="sm"
									bgColor="#24292f"
									color="#fff"
									_hover={{ bgColor: '#24292fdd', color: '#fff' }}
									_focus={{ borderColor: '#24292f' }}
									onClick={() => {
										trackEvent({
											category: EVENTS_CATEGORIES.HIGH,
											label: `${EVENTS.EDIT_ON_GITHUB}: ${post.fileName}`,
											action: EVENTS.EDIT_ON_GITHUB,
										});
										window.open(
											`${site.githubRepo}/blogs/${post.locale}/${post.fileName}.md`,
											'_blank'
										);
									}}
								>
									<Icon as={AiOutlineGithub} me={1} mb={0.5} fontSize="lg" />
									{t('editOnGithub')}
								</Button>
							</div>
						</Flex>
						
						<script src="https://giscus.app/client.js"
        data-repo="zeyadetman/zeyadetman.com"
        data-repo-id="MDEwOlJlcG9zaXRvcnk0MDU4NjIyODk="
        data-category="Announcements"
        data-category-id="DIC_kwDOGDD3kc4COmmU"
        data-mapping="pathname"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>

						<Newsletter />
					</Flex>
				</>
			)}
		</>
	);
}

export default BlogIndex;
