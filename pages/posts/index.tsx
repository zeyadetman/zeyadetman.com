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
import { useRouter } from 'next/router';
import MarkdownWrapper from '../../components/MarkdownRender';
import { IPost } from '../../interfaces/post';
import { GetStaticPropsResult } from 'next';
import Newsletter from '../../components/Newsletter';
import { generateRSSFeed } from '../../libs/feed';
import { site } from '../../configs/site';

interface Props {
	posts: IPost[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<IPost[]>> {
	const posts = await getPosts();
	generateRSSFeed(posts);

	return { props: { posts } };
}

function Blog(props: Props): ReactElement {
	const router = useRouter();
	const { colorMode } = useColorMode();
	const { posts } = props;
	const [listedPosts, setListedPosts] = useState<IPost[]>(posts);
	const [searchPostsInputText, setSearchPostsInput] = useState('');

	useEffect(() => {
		const filteredPosts: IPost[] = posts.filter(({ content }) =>
			content.includes(searchPostsInputText)
		);

		setListedPosts(filteredPosts);
	}, [searchPostsInputText, posts]);

	const renderPosts = () => {
		if (listedPosts.length === 0) {
			return (
				<Text fontSize="sm" color="gray.400" textAlign="center">
					No posts found. If you think it should exist, send me a message.
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
					Articles
					<Text fontSize="sm" marginTop="4" fontWeight="normal">
						I write about web development, and software engineering.
					</Text>
					<Newsletter />
				</Heading>
			</Stack>
			<Stack mt="8">
				<Text fontSize="sm" fontWeight="bold">
					Search articles
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
						placeholder="Search articles..."
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
