import { Code } from "@/app/_components/mdx-components/code";

export const ssrComponents = {
  pre: (props: any) => (
    <Code
      lang={props.children.props.className}
      code={props.children.props.children as string}
    />
  ),
};
