import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkLint from 'remark-lint';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	vs,
	vsDark,
	vscDarkPlus,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import { Code, Heading, Link, Text } from '@chakra-ui/layout';
import { Img } from '@chakra-ui/image';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface Props {
	content: string;
}

function MarkdownWrapper(props: Props) {
	const { content } = props;

	return (
		<ReactMarkdown
			children={content}
			remarkPlugins={[remarkGfm, remarkLint]}
			rehypePlugins={[rehypeRaw]}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					const lang = match?.[1] === 'js' ? 'javascript' : match?.[1];
					return !inline && match ? (
						<SyntaxHighlighter
							children={String(children).replace(/\n$/, '')}
							style={vscDarkPlus}
							PreTag="div"
							showLineNumbers
							showInlineLineNumbers
							language={lang}
							customStyle={{ marginBottom: '2rem' }}
							{...props}
						/>
					) : (
						<Code {...props}>{children}</Code>
					);
				},
				a({ node, children, href, ...props }) {
					return (
						<Link href={href} {...props}>
							{children}
						</Link>
					);
				},
				h2({ node, children }) {
					return (
						<Heading as="h2" fontSize="xl" mt="8" mb="6">
							{children}
						</Heading>
					);
				},
				p({ node, children }) {
					return <Text mb="8">{children}</Text>;
				},
				li({ node, children, ...props }) {
					const child = children.filter((item) => item !== '\n');
					return (
						<Text as="li" mb="2" {...props}>
							{child}
						</Text>
					);
				},
				img({ src, alt, ...props }) {
					return <Img src={src} mb="8" alt={alt} {...props} />;
				},
			}}
		/>
	);
}

export default MarkdownWrapper;
