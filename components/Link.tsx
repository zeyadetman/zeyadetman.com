import React from "react";
import NextLink, { LinkProps } from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

interface Props extends LinkProps {
  children: React.ReactNode;
  href: string;
}

function Link(props: Props) {
  const { children, href, ...restProps } = props;

  return (
    <NextLink href={href} {...restProps}>
      <ChakraLink>{children}</ChakraLink>
    </NextLink>
  );
}

export default Link;
