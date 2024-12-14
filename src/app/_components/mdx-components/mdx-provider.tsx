"use client";

import { CodeEditorLive } from "@/app/_components/code-editor";
import { Sandpack } from "@codesandbox/sandpack-react";
import { MDXProvider } from "@mdx-js/react";

export const CustomMdxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MDXProvider
      components={{
        CodeEditorLive,
        Snackpack: Sandpack,
      }}
    >
      {children}
    </MDXProvider>
  );
};
