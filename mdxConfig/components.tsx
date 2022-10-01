import { Box, Code, Link, Text } from "@chakra-ui/react";
import Heading from "components/Heading";
import HighlightCode from "components/Highlight";

const mdxComponentsMapping = {
  h2: (props: any) => (
    <Heading {...props} type="h2" mt={10} mb={2} fontWeight="semibold" />
  ),
  h3: (props: any) => (
    <Heading {...props} type="h3" mt={8} mb={2} fontWeight="semibold" />
  ),
  h4: (props: any) => (
    <Heading {...props} type="h4" mt={6} mb={1} fontWeight="semibold" />
  ),
  h5: (props: any) => (
    <Heading {...props} type="h5" mt={4} mb={1} fontWeight="semibold" />
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
  pre: (props: any) => <HighlightCode {...props} />,

  code: ({ ...props }: any) => {
    return <Code {...props} variant="inline" />;
  },
};

export default mdxComponentsMapping;
