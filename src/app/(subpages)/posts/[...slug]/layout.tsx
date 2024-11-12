import { getBlogPosts } from "@/app/(subpages)/posts/listPosts";
import { PostFooter } from "@/app/_components/post/footer";

import { notFound } from "next/navigation";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = (await getBlogPosts()).find((post) => post.slug === slug);

  if (!post) {
    null;
  }

  return post;
}

export default async function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="full-article">
      {children}

      <PostFooter post={post} />
    </article>
  );
}
