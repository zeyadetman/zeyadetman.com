import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { srcery } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { MDXComponents } from "mdx/types";
import { MdxBlockquote } from "@/app/_components/mdx-components/blockquote";
import { MdxImage } from "@/app/_components/mdx-components/image";
import { CustomMdxProvider } from "@/app/_components/mdx-components/mdx-provider";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export function SyntaxHighlight({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return (
    <SyntaxHighlighter
      // language="typescript"
      style={srcery}
      PreTag={React.Fragment}
      wrapLines
      wrapLongLines
    >
      {children}
    </SyntaxHighlighter>
  );
}

let components: MDXComponents = {
  Image: MdxImage,
  img: MdxImage,
  iframe: (props) => (
    <iframe
      style={{ width: "100%", height: "100%" }}
      src={props.src}
      {...props}
    />
  ),
  code: (props: any) => (
    <SyntaxHighlight>{props.children as string}</SyntaxHighlight>
  ),
  // pre: (props) => <pre>{props.children}</pre>,
  a: (props) => (
    <a className="link" {...props}>
      {props.children}
    </a>
  ),
  blockquote: MdxBlockquote,
};

export const MDX = async (props: any) => {
  // const mdxSource = await serialize(props.source, {
  //   mdxOptions: { remarkPlugins: [remarkGfm] },
  //   parseFrontmatter: true,
  // });

  return props.source;
  // <CustomMdxProvider>
  //   <MDXRemote
  //     {...props}
  //     components={{ ...components, ...(props.components || {}) }}
  //     // source={mdxSource}
  //   />
  // </CustomMdxProvider>
};
