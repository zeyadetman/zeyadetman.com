import mdxComponentsMapping from "mdxConfig/components";
import React from "react";
import { MDXRemote } from "next-mdx-remote";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { getPostBySlug, getPosts } from "utils/posts";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { TwitterShareButton } from "react-share";
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import config from "config";
import { useRouter } from "next/router";

interface Props {
  post: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

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

  if (!slug) return { notFound: true };

  const post = await getPostBySlug(slug);
  if (!post) return { notFound: true };

  return { props: { post, isProduction } };
}

function PostPage(props: Props) {
  const router = useRouter();
  const { post } = props;

  return (
    <VStack spacing={6}>
      <VStack textAlign="center" spacing={2}>
        <Heading style={{ direction: post.data.lang === "ar" ? "rtl" : "ltr" }}>
          {post.data.title}
        </Heading>
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
      </VStack>
      <Box className="mainPost">
        <MDXRemote {...post.content} components={mdxComponentsMapping} />
      </Box>
      <HStack spacing={4}>
        <TwitterShareButton
          title={post.data.title}
          via={config.username}
          url={`${config.baseUrl}${router.asPath}`}
          key="twitter-share-button"
        >
          <Button key="twitter-btn" variant="twitter">
            <Icon as={AiOutlineTwitter} me={1} mb={0.5} fontSize="lg" />
            Tweet
          </Button>
        </TwitterShareButton>

        <div>
          <Button
            key="github-edit-button"
            onClick={() => {
              window.open(
                `${config.githubRepo}/posts/${post.fileName}.mdx`,
                "_blank"
              );
            }}
          >
            <Icon as={AiOutlineGithub} me={1} mb={0.5} fontSize="lg" />
            Edit on GitHub
          </Button>
        </div>
      </HStack>
    </VStack>
  );
}

export default PostPage;
