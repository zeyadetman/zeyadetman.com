"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { components } from "@/app/_components/post/components";

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
