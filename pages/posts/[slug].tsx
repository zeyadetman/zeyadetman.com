import mdxComponentsMapping from "mdxConfig/components";
import React from "react";
import { MDXRemote } from "next-mdx-remote";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { getPostBySlug, getPosts } from "utils/posts";

interface Props {
  post: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  console.log({ posts });
  const slugs = posts.map((post: any, index: number) => ({
    params: { slug: post?.fileName },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export async function getStaticProps(
  props: GetStaticPropsContext
): Promise<any> {
  const isProduction = process.env.NODE_ENV === "production";
  const {
    params: { slug },
  } = props as any;

  if (slug) {
    const post = await getPostBySlug(slug);

    if (post) {
      return {
        props: {
          post,
          isProduction,
        },
      };
    }

    return {
      notFound: true,
    };
  }

  return {
    notFound: true,
  };
}

function PostPage(props: Props) {
  console.log("hiii");
  const { post } = props;

  console.log({ post });

  return <MDXRemote {...post.content} components={mdxComponentsMapping} />;
}

export default PostPage;
