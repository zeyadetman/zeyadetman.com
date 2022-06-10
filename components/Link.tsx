import React from "react";
import NextLink, { LinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface Props extends LinkProps {
  children: React.ReactNode;
  href: string;
  isExternal?: boolean;
  chackraProps?: ChakraLinkProps;
}

function Link(props: Props) {
  const { children, href, isExternal, chackraProps, ...restProps } = props;
  if (isExternal) {
    return (
      <ChakraLink
        href={href}
        target="_blank"
        rel="nonopener noreferrer"
        {...chackraProps}
      >
        {children}
      </ChakraLink>
    );
  }

  return (
    <NextLink href={href} {...restProps} passHref>
      <ChakraLink {...chackraProps}>{children}</ChakraLink>
    </NextLink>
  );
}

export default Link;
