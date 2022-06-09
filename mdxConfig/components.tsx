import { Code, Link } from "@chakra-ui/react";
import Heading from "components/Heading";
import theme from "react-syntax-highlighter/dist/cjs/styles/prism/vs";
import SyntaxHighlighter from "react-syntax-highlighter";

const mdxComponentsMapping = {
  h2: (props: any) => <Heading {...props} type="h2" my={4} />,
  h3: (props: any) => <Heading {...props} type="h3" my={3} />,
  h4: (props: any) => <Heading {...props} type="h4" my={2} />,
  h5: (props: any) => <Heading {...props} type="h5" my={2} />,
  a: (props: any) => (
    <Link {...props} target="_blank" rel="noopener noreferrer" />
  ),
  code: ({ className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const lang = match?.[1] === "js" ? "javascript" : match?.[1];

    return match ? (
      <SyntaxHighlighter
        language={lang}
        PreTag="div"
        {...props}
        wrapLongLines
        style={theme}
      />
    ) : (
      <Code {...props} />
    );
  },
};

export default mdxComponentsMapping;
