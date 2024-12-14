import { PostFooter } from "@/app/_components/post/footer";
import { getBlogPosts } from "@/lib/listPosts";

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
    <article className="full-article w-full mx-auto">
      {children}

      <PostFooter post={post} />
    </article>
  );
}
