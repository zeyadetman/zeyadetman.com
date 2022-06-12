import { Box, Code, Link, Text } from "@chakra-ui/react";
import Heading from "components/Heading";
import theme from "react-syntax-highlighter/dist/cjs/styles/prism/vs";
import SyntaxHighlighter from "react-syntax-highlighter";

const mdxComponentsMapping = {
  h2: (props: any) => (
    <Heading {...props} type="h2" my={3} fontWeight="semibold" />
  ),
  h3: (props: any) => (
    <Heading {...props} type="h3" my={2} fontWeight="semibold" />
  ),
  h4: (props: any) => (
    <Heading {...props} type="h4" my={2} fontWeight="semibold" />
  ),
  h5: (props: any) => (
    <Heading {...props} type="h5" my={2} fontWeight="semibold" />
  ),
  a: (props: any) => (
    <Link
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      variant="postLink"
    />
  ),
  p: (props: any) => (
    <Text
      {...props}
      letterSpacing="wide"
      lineHeight="1.7"
      wordBreak="break-word"
      textAlign="justify"
    />
  ),
  li: (props: any) => <Text as="li" {...props} my="3" />,
  ul: (props: any) => (
    <Box
      as="ul"
      {...props}
      listStylePos="inside"
      listStyleType="square"
      wordBreak="break-all"
    />
  ),
  ol: (props: any) => (
    <Box as="ol" {...props} listStylePos="inside" wordBreak="break-all" />
  ),
  img: (props: any) => <Box as="img" {...props} my="4" mx="auto" />,

  code: ({ className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const lang = match?.[1] === "js" ? "javascript" : match?.[1];

    return match ? (
      <Box my={4}>
        <SyntaxHighlighter
          language={lang}
          PreTag="div"
          {...props}
          wrapLongLines
          style={theme}
        />
      </Box>
    ) : (
      <Code {...props} variant="inline" />
    );
  },
};

export default mdxComponentsMapping;
