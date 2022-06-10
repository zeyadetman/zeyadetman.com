import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import getConfig from "next/config";
import { serialize } from "next-mdx-remote/serialize";
import { mdxOptions } from "mdxConfig/options";

async function getPosts(): Promise<any[]> {
  const { serverRuntimeConfig } = getConfig();
  const postsDirectory = path.join(serverRuntimeConfig.PROJECT_ROOT, `/posts/`);
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .map(async (filename: string) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { content, data } = matter(fileContents);

      return {
        content: await serialize(content, {
          // @ts-ignore
          mdxOptions: {
            ...mdxOptions,
          },
        }),
        text: content,
        data,
        fileName: path.parse(filePath).name,
        slug: path.parse(filePath).name,
        readingTime: readingTime(content),
      };
    })
    .filter(Boolean);

  const allPosts = await Promise.all(posts);

  const postsSortedByDate = allPosts.sort(
    (a, b) => +new Date(b.data.date) - +new Date(a.data.date)
  );

  return allPosts.filter((post) => post?.fileName);
}

async function getPostBySlug(slug: string): Promise<null | any> {
  const posts = await getPosts();
  const post = posts.find(({ fileName }) => slug === fileName);
  return post || null;
}

export { getPosts, getPostBySlug };
