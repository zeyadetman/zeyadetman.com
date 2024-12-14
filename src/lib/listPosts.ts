import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import remarkGfm from "remark-gfm";
import { Metadata } from "@/app/(subpages)/posts/interfaces";
import { components } from "@/app/_components/mdx-components/components";
import { ssrComponents } from "@/app/_components/mdx-components/ssr-components";

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

async function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  const { content, frontmatter } = await compileMDX({
    source: rawContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: {
      ...components,
      ...ssrComponents,
    },
  });

  return {
    content,
    metadata: frontmatter as Metadata,
    rawContent,
  };
}

async function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return await Promise.all(
    mdxFiles.map(async (file) => {
      let { metadata, content, rawContent } = await readMDXFile(
        path.join(dir, file)
      );
      let slug = metadata.slug || path.basename(file, path.extname(file));

      return {
        metadata,
        slug,
        content,
        rawContent,
      };
    })
  );
}

export async function getBlogPosts(props?: {
  query: string;
  includeDrafts?: boolean;
}) {
  const mdxData = (
    await getMDXData(
      path.join(process.cwd(), "src", "app", "(subpages)", "posts", "posts")
    )
  ).sort((a, b) => {
    if (a.metadata.date && b.metadata.date) {
      return (
        new Date(b.metadata.date).valueOf() -
        new Date(a.metadata.date).valueOf()
      );
    }
    return 0;
  });

  let finalData = [
    ...mdxData.filter((post) => props?.includeDrafts || !post.metadata.isDraft),
  ];

  if (props?.query) {
    finalData = [
      ...(mdxData.filter((post) =>
        post.rawContent
          .toLowerCase()
          .includes((props.query as string).toLowerCase())
      ) || []),
    ];
  }

  return finalData;
}
