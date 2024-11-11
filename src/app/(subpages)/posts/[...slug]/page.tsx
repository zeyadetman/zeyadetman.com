import { notFound } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";
import { Tajawal } from "next/font/google";
import { config } from "@/config";
import { getBlogPosts } from "@/app/(subpages)/posts/listPosts";
import { MDX } from "@/app/_components/mdx-components/mdx";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = getBlogPosts().find((post) => post.slug === slug);

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
    description: post.metadata.title,
    openGraph: {
      title: "Zeyad Etman | " + post.metadata.title,
      description: post.metadata.title,
      url: `${config.baseUrl}/posts/${post.slug}`,
      siteName: "Zeyad Etman",
      images: [
        {
          url: `${config.baseUrl}/api/og?title=${post.metadata.title}&url=${
            config.baseUrl
          }/posts/${post.slug}&date=${post.metadata.date}&isRtl=${
            post.metadata.lang === "ar"
          }`, // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: `${config.baseUrl}/api/og?title=${post.metadata.title}&url=${
            config.baseUrl
          }/posts/${post.slug}&date=${post.metadata.date}&isRtl=${
            post.metadata.lang === "ar"
          }`, // Dynamic og route
          width: 1800,
          height: 1600,
          alt: post.metadata.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  const all = getBlogPosts().map((post) => ({
    slug: post.slug.split("/"),
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
    post?.metadata.lang === "ar"
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
          style={{
            ...(post?.metadata.lang === "ar" ? { direction: "rtl" } : {}),
          }}
        >
          {post.metadata.title}
        </h1>
        <time className="block mt-2 font-medium date-view text-xs">
          Published {format(new Date(post.metadata.date), "dd MMM yyyy")}
        </time>
      </div>

      <MDX source={post.content} />
    </article>
  );
}
