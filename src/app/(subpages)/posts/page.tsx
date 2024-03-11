import { SearchPostsInput } from "@/app/components/post/search";
import { listPosts } from "@/lib/listPosts";
import { formatDate } from "@/utils/date";
import { Tajawal } from "next/font/google";
import Link from "next/link";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-ibm-plex-sans-arabic",
});

export default function Blog({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Blog</h1>
        <h2>Thoughts about software development and Life</h2>
      </div>

      <SearchPostsInput />

      <ul className="menu p-0 mt-0">
        {listPosts({ query: searchParams.q }).map((post) => {
          const baseClassName =
            "text-primary-content text-[1rem] decoration-none my-0";
          const className =
            baseClassName +
            (post?.lang === "ar"
              ? ` w-fit rtl font-extrabold ${tajawal.className}`
              : ``);

          return (
            <article key={post._id} className="card post-viewer">
              <Link href={post.slug} className="no-underline">
                <h3
                  className={className}
                  style={{
                    ...(post?.lang === "ar" ? { direction: "rtl" } : {}),
                  }}
                >
                  {post.title}
                </h3>
                <div className="flex justify-between">
                  {post.date && (
                    <p className="text-xs my-0">{formatDate(post.date)}</p>
                  )}
                  {post.lang === "ar" && (
                    <span className="badge">{post.lang}</span>
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
