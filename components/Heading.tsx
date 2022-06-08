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
  h2: "3xl",
  h3: "2xl",
  h4: "xl",
  h5: "lg",
  h6: "md",
};

const Heading = ({ type, children, ...props }: HeadingProps) => {
  return (
    <ChakraHeading as={type} size={sizes[type]} {...props}>
      {children}
    </ChakraHeading>
  );
};

export default Heading;
