import React, { useEffect, useState } from 'react';
import {
	Stack,
	Text,
	Heading,
	InputGroup,
	InputLeftElement,
	Input,
	Flex,
	useColorModeValue,
} from '@chakra-ui/react';
import { Badge, Box, HStack, Link } from '@chakra-ui/layout';
import { SearchIcon } from '@chakra-ui/icons';
import { getPosts } from '../../libs/posts';
import { useRouter } from 'next/router';
import MarkdownWrapper from '../../components/MarkdownRender';
import { IPost } from '../../interfaces/post';

interface Props {
	posts: IPost[];
}

export async function getStaticProps() {
	const posts = await getPosts();
	return { props: { posts } };
}

function Blog(props: Props) {
	const router = useRouter();
	const { posts } = props;
	const [listedPosts, setListedPosts] = useState<IPost[]>(posts);
	const [searchPostsInputText, setSearchPostsInput] = useState('');

	useEffect(() => {
		const filteredPosts: IPost[] = posts.filter(({ content }) =>
			content.includes(searchPostsInputText)
		);

		setListedPosts(filteredPosts);
	}, [searchPostsInputText]);

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
				<Badge size="xs" variant="tag" key={tag}>
					{tag}
				</Badge>
			));
		};

		return listedPosts.map(({ data, fileName, readingTime, excerpt }) => {
			return (
				<Stack as="article" key={fileName} py={4}>
					<Box as="header">
						<Link
							textAlign="start"
							fontSize="xl"
							fontWeight="bold"
							onClick={() => router.push(`/posts/${fileName}`)}
							as="button"
							variant="title"
							color={useColorModeValue('blackMid', 'whiteMid')}
						>
							{data.title}
						</Link>
						<Flex
							fontSize="xs"
							color="gray.500"
							flexWrap="wrap"
							css={{ gap: '0.3rem 1rem' }}
						>
							<Text>
								<Text display="inline">{`${data.date}  •  `}</Text>
								{readingTime.text}
							</Text>
							{data.tags.length ? (
								<HStack>{renderTags(data.tags)}</HStack>
							) : null}
						</Flex>
					</Box>
					<Box as="div">
						<Text
							fontSize="sm"
							noOfLines={3}
							color={useColorModeValue('gray.600', 'gray.300')}
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
						I write about software engineering, and frontend.
					</Text>
				</Heading>
			</Stack>
			<Stack mt="8">
				<Text fontSize="sm" fontWeight="bold">
					Search articles
				</Text>
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						children={<SearchIcon color="gray.300" />}
					/>
					<Input
						_hover={{
							bg: 'transparent',
						}}
						_focus={{
							borderColor: useColorModeValue('black', 'gray.300'),
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
