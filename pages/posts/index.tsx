/* eslint-disable */
//@ts-nocheck
import React, { ReactElement, useEffect, useState } from 'react';
import {
	Stack,
	Text,
	Heading,
	InputGroup,
	InputLeftElement,
	Input,
	Flex,
	useColorModeValue,
	useColorMode,
} from '@chakra-ui/react';
import { Badge, Box, HStack, Link } from '@chakra-ui/layout';
import NextLink from 'next/link';
import { SearchIcon } from '@chakra-ui/icons';
import { getPosts } from '../../libs/posts';
import MarkdownWrapper from '../../components/MarkdownRender';
import { IPost } from '../../interfaces/post';
import { GetStaticPropsResult } from 'next';
import Newsletter from '../../components/Newsletter';
import { generateRSSFeed } from '../../libs/feed';
import { site } from '../../configs/site';
import { trackEvent } from '../../libs/gtag';
import { EVENTS, EVENTS_CATEGORIES } from '../../utils/events';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';

interface Props {
	posts: IPost[];
}

export async function getStaticProps({
	locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<IPost[]>> {
	const posts = await getPosts(locale);
	const arPosts = await getPosts('ar');
	const enPosts = await getPosts('en');

	generateRSSFeed([...enPosts, ...arPosts]);

	const messages = await import(`/messages/${locale}.json`);
	return { props: { posts, messages: JSON.stringify(messages) } };
}

function Blog(props: Props): ReactElement {
	const t = useTranslations('Articles');
	const { colorMode } = useColorMode();
	const { posts } = props;
	const [listedPosts, setListedPosts] = useState<IPost[]>(posts);
	const [searchPostsInputText, setSearchPostsInput] = useState('');
	const a = useRouter();

	useEffect(() => {
		trackEvent({
			action: EVENTS.SEARCH_ARTICLES,
			label: `Search text: ${searchPostsInputText}`,
			category: EVENTS_CATEGORIES.MID,
		});
		const filteredPosts: IPost[] = posts.filter(({ content }) =>
			content.includes(searchPostsInputText)
		);

		setListedPosts(filteredPosts);
	}, [searchPostsInputText, posts]);

	const renderPosts = () => {
		if (listedPosts.length === 0) {
			return (
				<Text fontSize="sm" color="gray.400" textAlign="center">
					{t('noPosts')}
				</Text>
			);
		}
		const renderTags = (tags: [string]) => {
			return tags.map((tag: string) => (
				<Badge size="xs" variant="tag" key={tag} ms="0 !important">
					{tag}
				</Badge>
			));
		};

		return listedPosts.map(({ data, fileName, readingTime, excerpt }) => {
			return (
				<Stack as="article" key={fileName} py={4}>
					<Box as="header">
						<NextLink href={`/posts/${encodeURIComponent(fileName)}`} passHref>
							<Link
								textAlign="start"
								fontSize="xl"
								fontWeight="bold"
								variant="title"
								color={colorMode === 'light' ? 'blackMid' : 'whiteMid'}
							>
								{data.title}
							</Link>
						</NextLink>
						<Flex fontSize="xs" flexWrap="wrap" css={{ gap: '0.3rem 1rem' }}>
							<Text>
								<Text display="inline">{`${data.date}  •  `}</Text>
								{readingTime.text}
							</Text>
							{data.tags.length ? (
								<HStack flexWrap="wrap" display="flex" css={{ gap: '5px' }}>
									{renderTags(data.tags)}
								</HStack>
							) : null}
						</Flex>
					</Box>
					<Box as="div">
						<Text
							fontSize="sm"
							noOfLines={site.post?.excerpt?.noOfLines || 3}
							color={colorMode === 'light' ? 'blackLight' : 'whiteDark'}
						>
							<MarkdownWrapper content={excerpt || ''} />
						</Text>
					</Box>
				</Stack>
			);
		});
	};

	return (
		<>
			<Stack>
				<Heading color={useColorModeValue('black', 'white')}>
					{t('articles')}
					<Text fontSize="sm" marginTop="4" fontWeight="normal">
						{t('articlesInfo')}
					</Text>
					<Newsletter />
				</Heading>
			</Stack>
			<Stack mt="8">
				<Text fontSize="sm" fontWeight="bold">
					{t('searchArticles')}
				</Text>
				<InputGroup>
					<InputLeftElement pointerEvents="none">
						<SearchIcon color="whiteDark" />
					</InputLeftElement>
					<Input
						_hover={{
							bg: 'transparent',
						}}
						_focus={{
							borderColor: useColorModeValue('blackLight', 'whiteDark'),
						}}
						placeholder={t('searchArticlesPlaceholder')}
						borderRadius="5"
						onChange={(e) => {
							setSearchPostsInput(e.target.value);
						}}
					/>
				</InputGroup>
			</Stack>
			<Stack mt="8">{renderPosts()}</Stack>
		</>
	);
}

export default Blog;
