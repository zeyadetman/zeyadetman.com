import { getPostFromParams } from "@/app/(subpages)/posts/[...slug]/page";
import { PostFooter } from "@/app/components/post/footer";
import { notFound } from "next/navigation";

export default async function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="full-article">
      {children}

      <PostFooter post={post} />
    </article>
  );
}
