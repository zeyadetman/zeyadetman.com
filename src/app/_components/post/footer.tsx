"use client";
import { config } from "@/config";
import { GithubLogo, TwitterLogo } from "@phosphor-icons/react";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { Post } from "@/app/(subpages)/posts/interfaces";

interface PostFooterProps {
  post: Post;
}

export const PostFooter = ({ post }: PostFooterProps) => {
  const { theme } = useTheme();
  return (
    <>
      <div className="flex justify-center gap-3 my-6">
        <button
          key="twitter-share-button"
          className="btn btn-primary btn-md bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?text=${post.metadata.title}&url=${config.baseUrl}/posts/${post.slug}`,
              "_blank"
            );
          }}
        >
          <TwitterLogo />
          Tweet
        </button>

        <div>
          <button
            key="github-edit-button"
            className="btn btn-primary btn-md dark:bg-black light:bg-primary-content light:text-primary light:hover:text-primary-content"
            onClick={() => {
              window.open(
                `${config.githubRepo}/blob/main/content/${post.slug}.mdx`,
                "_blank"
              );
            }}
          >
            <GithubLogo />
            Edit on GitHub
          </button>
        </div>
      </div>

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
        theme={theme === "dark" ? "dark_dimmed" : "light"}
        lang="en"
        loading="lazy"
      />
    </>
  );
};
