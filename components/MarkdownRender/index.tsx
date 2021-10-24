import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkLint from 'remark-lint';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import { Code, Heading, Link, Text } from '@chakra-ui/layout';
import Image from 'next/image';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/react';

interface Props {
	content: string;
}

function MarkdownWrapper(props: Props): ReactElement {
	const { content } = props;
	const h2Color = useColorModeValue('black', 'white');

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm, remarkLint]}
			rehypePlugins={[rehypeRaw]}
			components={{
				code({ inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					const lang = match?.[1] === 'js' ? 'javascript' : match?.[1];
					return !inline && match ? (
						<SyntaxHighlighter
							style={vscDarkPlus}
							PreTag="div"
							showLineNumbers
							showInlineLineNumbers
							language={lang}
							customStyle={{ marginBottom: '2rem' }}
						>
							{String(children).replace(/\n$/, '') || ''}
						</SyntaxHighlighter>
					) : (
						<Code {...props}>{children}</Code>
					);
				},
				a({ children, href, ...props }) {
					return (
						<Link href={href} {...props}>
							{children}
						</Link>
					);
				},
				h2({ children }) {
					return (
						<Heading
							as="h2"
							fontSize="xl"
							mt="8"
							mb="6"
							color={h2Color}
							fontWeight="bold"
						>
							{children}
						</Heading>
					);
				},
				h3({ children }) {
					return (
						<Heading
							as="h3"
							fontSize="md"
							mt="8"
							mb="6"
							color={h2Color}
							fontWeight="bold"
						>
							{children}
						</Heading>
					);
				},
				p({ children }) {
					return <Text mb="8">{children}</Text>;
				},
				li({ children }) {
					const child = children.filter((item) => item !== '\n');
					return (
						//eslint-disable-next-line
						//@ts-ignore
						<Text as="li" mb="2" ms="4">
							{child}
						</Text>
					);
				},
				img({ src, alt }) {
					return (
						<Box width="100%" className="post-image-container">
							<Image
								src={src || ''}
								alt={alt}
								layout="fill"
								className="image"
							/>
						</Box>
					);
				},
			}}
		>
			{content}
		</ReactMarkdown>
	);
}

export default MarkdownWrapper;
