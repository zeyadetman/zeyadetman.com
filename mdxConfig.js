import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';

export const mdxOptions = {
	remarkPlugins: [],
	rehypePlugins: [rehypeSlug, rehypeMinifyWhitespace, rehypeHighlight],
};
