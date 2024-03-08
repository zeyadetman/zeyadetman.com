import { SearchPostsInput } from "@/app/components/post/search";
import { listPosts } from "@/lib/listPosts";
import { formatDate } from "@/utils/date";
import Link from "next/link";

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
        {listPosts({ query: searchParams.q }).map((post) => (
          <article key={post._id} className="card post-viewer">
            <Link href={post.slug} className="no-underline">
              <h3 className="text-primary-content text-[1rem] decoration-none my-0">
                {post.title}
              </h3>
              {post.date && (
                <p className="text-xs my-0">{formatDate(post.date)}</p>
              )}
            </Link>
          </article>
        ))}
      </ul>
    </div>
  );
}
