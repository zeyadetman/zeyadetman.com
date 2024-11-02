import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allPages } from "contentlayer/generated";
import { Mdx } from "@/app/_components/post/mdx-components";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: `Zeyad Etman | ${page.title}`,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="page-container prose dark:prose-invert">
      <div className="page-header">
        <h1>{page.header}</h1>
        <h2>{page.description}</h2>
      </div>

      <main className="text-sm">
        <Mdx code={page.body.code} />
      </main>
    </article>
  );
}
