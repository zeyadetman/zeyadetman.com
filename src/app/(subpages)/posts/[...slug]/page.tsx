import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/app/components/post/mdx-components";
import { format } from "date-fns";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: "Zeyad Etman | " + post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  const all = allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));

  return all;
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-4">{post.title}</h1>
      {/* <ul className="m-0 p-0 flex-wrap mt-2 flex gap-1">
        {post.tags?.map((tag) => (
          <span className="badge" key={tag}>
            {tag}
          </span>
        ))}
      </ul> */}

      <time className="block text-sm mt-2 font-medium date-view">
        {format(new Date(post.date), "dd MMM yyyy")}
      </time>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  );
}
