import mdxComponentsMapping from "mdxConfig/components";
import React from "react";
import { MDXRemote } from "next-mdx-remote";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { getPostBySlug, getPosts } from "utils/posts";
import { Badge, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

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
  const { post } = props;

  console.log({ post });

  return (
    <VStack spacing={6}>
      <Box textAlign="center">
        <Heading>{post.data.title}</Heading>
        <HStack justifyContent={"center"} wrap="wrap" spacing="4">
          <Text fontSize="sm" as="time" dateTime={post.data.date}>
            {post.data.date}
          </Text>
          <Text fontSize="sm">{post.readingTime.text}</Text>
          <HStack>
            {post.data.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                fontSize="10"
                bg="#ffc700"
                color="black"
              >
                {tag}
              </Badge>
            ))}
          </HStack>
        </HStack>
      </Box>
      <Box className="mainPost">
        <MDXRemote {...post.content} components={mdxComponentsMapping} />
      </Box>
    </VStack>
  );
}

export default PostPage;
