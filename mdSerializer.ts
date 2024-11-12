import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

const mdSerialize = async (source: string) => {
  return await serialize(source, {
    mdxOptions: { remarkPlugins: [remarkGfm] },
  });
};

export { mdSerialize };
