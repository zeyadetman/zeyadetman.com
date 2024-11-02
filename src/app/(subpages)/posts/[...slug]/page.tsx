import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/app/_components/post/mdx-components";
import { format } from "date-fns";
import { Tajawal } from "next/font/google";
import { config } from "@/config";

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
    description: post.description,
    openGraph: {
      title: "Zeyad Etman | " + post.title,
      description: post.title,
      url: `${config.baseUrl}/posts/${post.slugAsParams}`,
      siteName: "Zeyad Etman",
      images: [
        {
          url: `${config.baseUrl}/api/og?title=${post.title}&url=${
            config.baseUrl
          }/posts/${post.slugAsParams}&date=${post.date}&isRtl=${
            post.lang === "ar"
          }`, // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: `${config.baseUrl}/api/og?title=${post.title}&url=${
            config.baseUrl
          }/posts/${post.slugAsParams}&date=${post.date}&isRtl=${
            post.lang === "ar"
          }`, // Dynamic og route
          width: 1800,
          height: 1600,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  const all = allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));

  return all;
}

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex-sans-arabic",
});

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  const className =
    post?.lang === "ar"
      ? `py-6 prose dark:prose-invert font-medium ${tajawal.className}`
      : `py-6 prose dark:prose-invert`;

  if (!post) {
    notFound();
  }

  return (
    <article className={className}>
      <div className="mb-12">
        <h1
          className="mb-0"
          style={{ ...(post?.lang === "ar" ? { direction: "rtl" } : {}) }}
        >
          {post.title}
        </h1>
        <time className="block mt-2 font-medium date-view text-xs">
          Published {format(new Date(post.date), "dd MMM yyyy")}
        </time>
      </div>

      <Mdx code={post.body.code} />
    </article>
  );
}
