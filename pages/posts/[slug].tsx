import mdxComponentsMapping from "mdxConfig/components";
import React, { useEffect, useState } from "react";
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
  Stack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import config from "config";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getViews, hitPath } from "utils/analytics";
import Giscus from "@giscus/react";

interface Props {
  post: any;
  isProduction: boolean;
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
  const [pageVisits, setPageVisits] = useState(0);
  const { post, isProduction } = props;
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (post) {
      const updatePathViews = async () => {
        const views: number = await hitPath(post.fileName);
        setPageVisits(views);
      };

      const getPathViews = async () => {
        const views: number = await getViews(post.fileName);
        setPageVisits(views);
      };

      if (post.fileName) {
        if (isProduction) {
          updatePathViews();
        } else {
          getPathViews();
        }
      }
    }
  }, [isProduction, post]);

  return (
    <>
      <NextSeo
        title={`${post.data.title}`}
        description={post.excerpt}
        canonical={`${config.baseUrl}${router.asPath}`}
        openGraph={{
          url: `${config.baseUrl}${router.asPath}`,
          title: `${post.data.title}`,
          description: post.excerpt,
          images: [
            {
              url: "/static/images/logo.jpeg",
              width: 200,
              height: 200,
              alt: "Logo",
              type: "image/jpeg",
            },
          ],
        }}
      />

      <VStack spacing={6}>
        <VStack textAlign="center" spacing={2}>
          <Heading dir={post.data.lang === "ar" ? "rtl" : "ltr"}>
            {post.data.title}
          </Heading>
          <VStack spacing={2}>
            <HStack justifyContent={"center"} wrap="wrap" spacing="4">
              <Text
                fontSize="sm"
                as="time"
                dateTime={post.data.date}
                opacity="0.7"
              >
                {post.data.date}
              </Text>
              <Text fontSize="sm" opacity="0.7">
                {new Intl.NumberFormat().format(pageVisits)} Views
              </Text>
              <Text fontSize="sm" opacity="0.7">
                {post.readingTime.text}
              </Text>
            </HStack>
            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="baseline"
              flexWrap="wrap"
              gap="2"
            >
              {post?.data?.isThread && (
                <Badge
                  variant="thread"
                  onClick={() => {
                    window.open(post.data.threadUrl, "_blank");
                  }}
                >
                  thread
                </Badge>
              )}
              {post.data.tags.map((tag: string) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </Stack>
          </VStack>
        </VStack>
        <Box className="mainPost">
          <MDXRemote {...post.content} components={mdxComponentsMapping} />
        </Box>
        <Giscus
          repo="zeyadetman/zeyadetman.com"
          repoId="MDEwOlJlcG9zaXRvcnk0MDU4NjIyODk="
          category="Announcements"
          categoryId="DIC_kwDOGDD3kc4COmmU"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="1"
          inputPosition="top"
          theme={colorMode === "dark" ? "dark_dimmed" : "light"}
          lang="en"
          loading="lazy"
        />
        <Stack
          flexDirection={["column", "row", "row", "row"]}
          alignItems={["center", "baseline", "baseline", "baseline"]}
          gap={[0, 2, 2, 2]}
        >
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
                  `${config.githubRepo}/blob/main/posts/${post.fileName}.mdx`,
                  "_blank"
                );
              }}
            >
              <Icon as={AiOutlineGithub} me={1} mb={0.5} fontSize="lg" />
              Edit on GitHub
            </Button>
          </div>
        </Stack>
      </VStack>
    </>
  );
}

export default PostPage;
