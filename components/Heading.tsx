import React from "react";
import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/react";

export interface HeadingProps extends ChakraHeadingProps {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const sizes = {
  h1: "4xl",
  h2: "2xl",
  h3: "xl",
  h4: "lg",
  h5: "md",
  h6: "sm",
};

const Heading = ({ type, children, ...props }: HeadingProps) => {
  return (
    <ChakraHeading as={type} size={sizes[type]} {...props}>
      {children}
    </ChakraHeading>
  );
};

export default Heading;
