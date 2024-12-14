import React from "react";
import { MDXComponents } from "mdx/types";
import { MdxBlockquote } from "@/app/_components/mdx-components/blockquote";
import { MdxImage } from "@/app/_components/mdx-components/image";
import { CodeEditorLive } from "@/app/_components/code-editor";

export const components: MDXComponents = {
  Image: MdxImage,
  img: MdxImage,
  iframe: (props) => (
    <iframe
      style={{ width: "100%", height: "100%" }}
      src={props.src}
      {...props}
    />
  ),
  code: (props) => <code>{props.children}</code>,
  a: (props) => (
    <a className="link" {...props}>
      {props.children}
    </a>
  ),
  blockquote: MdxBlockquote,
  CodeEditorLive,
};
