import { Badge, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';

import { getPostBySlug, getPosts } from '../../libs/posts';

import { useColorModeValue } from '@chakra-ui/color-mode';
import MarkdownWrapper from '../../components/MarkdownRender';
import { IPost } from '../../interfaces/post';
import { useRouter } from 'next/router';

interface Props {
	post: IPost;
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
	const { post } = props;
	const router = useRouter();

	if (!post) {
		router.push('/404');
		return <></>;
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
			<Stack mb="8">
				<Heading as="h1" fontSize="3xl">
					{post.data.title}
				</Heading>
				<Flex
					fontSize="xs"
					color={useColorModeValue('gray.500', 'gray.500')}
					flexWrap="wrap"
					css={{ gap: '0.3rem 1rem' }}
				>
					<Text>
						<Text display="inline">{`${post.data.date}  •  `}</Text>
						{post.readingTime.text}
					</Text>
					{post.data.tags.length ? (
						<HStack>{renderTags(post.data.tags)}</HStack>
					) : null}
				</Flex>
			</Stack>
			<MarkdownWrapper content={post.content} />
		</>
	);
}

export default BlogIndex;
