import { SearchPostsInput } from "@/app/_components/post/search";
import { getBlogPosts } from "@/lib/listPosts";
import { formatDate } from "@/utils/date";
import { Tajawal } from "next/font/google";
import Link from "next/link";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex-sans-arabic",
});

export default async function Blog({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const posts = await getBlogPosts({ query: searchParams.q || "" });
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Blog</h1>
        <h2>Thoughts about software development and Life</h2>
      </div>

      <SearchPostsInput />

      <ul className="menu p-0 mt-0">
        {posts.map((post) => {
          const baseClassName =
            "text-primary-content text-[1rem] decoration-none my-0";
          const className =
            baseClassName +
            (post?.metadata.lang === "ar"
              ? ` w-fit rtl font-extrabold ${tajawal.className}`
              : ``);

          return (
            <article key={post.slug} className="card post-viewer">
              <Link
                href={`/posts/${post.slug}`}
                className="no-underline w-full"
              >
                <h3
                  className={className}
                  style={{
                    ...(post?.metadata.lang === "ar"
                      ? { direction: "rtl" }
                      : {}),
                  }}
                >
                  {post.metadata.title}
                </h3>
                <div className="flex justify-start items-center gap-1">
                  {post.metadata.date && (
                    <p className="text-xs my-0">
                      {formatDate(post.metadata.date)}
                    </p>
                  )}
                  {post.metadata.lang === "ar" && (
                    <span className={`badge ${tajawal.className}`}>
                      بالعربي
                    </span>
                  )}
                </div>
              </Link>
            </article>
          );
        })}
      </ul>
    </div>
  );
}
