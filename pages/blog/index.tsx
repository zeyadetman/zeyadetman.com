import React from 'react';
import Layout from '../../components/Layout';
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

interface Props {
	posts: [any];
}

export async function getServerSideProps() {
	const posts = await getPosts();
	return { props: { posts } };
}

function Blog(props: Props) {
	const router = useRouter();
	const { posts } = props;

	const renderPosts = () => {
		const renderTags = (tags: [string]) => {
			return tags.map((tag: string) => (
				<Badge size="xs" variant="tag">
					{tag}
				</Badge>
			));
		};

		return posts.map(({ data, fileName, readingTime }) => {
			return (
				<Stack as="article" key={fileName}>
					<Box as="header">
						<Link
							fontSize="xl"
							fontWeight="bold"
							onClick={() => router.push(`/blog/${fileName}`)}
							as="button"
						>
							{data.title}
						</Link>
						<Flex
							fontSize="xs"
							color={useColorModeValue('gray.500', 'gray.500')}
						>
							<Text>
								<Text display="inline">{`${data.date}  •  `}</Text>
								{readingTime.text}
							</Text>
							{data.tags.length ? (
								<HStack ms="4">{renderTags(data.tags)}</HStack>
							) : null}
						</Flex>
					</Box>
					<Box as="div"></Box>
				</Stack>
			);
		});
	};

	return (
		<Layout>
			<Stack>
				<Heading>
					Articles
					<Text fontSize="sm" marginTop="4" fontWeight="normal">
						I write about software engineering, and frontend.{' '}
						<Text fontSize="xs" display="inline">
							Also I write thoughts about life and living.
						</Text>
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
					<Input placeholder="Search articles" borderRadius="5" />
				</InputGroup>
			</Stack>
			<Stack mt="8">{renderPosts()}</Stack>
		</Layout>
	);
}

export default Blog;
