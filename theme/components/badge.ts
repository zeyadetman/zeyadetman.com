/* eslint-disable import/no-anonymous-default-export */
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

export default {
  baseStyle: ({ theme }: StyleFunctionProps) => ({
    variant: "outline",
    fontSize: "10",
    color: "black",
    bgColor: "yellow",
  }),
  variants: {
    thread: ({ theme }: StyleFunctionProps) => ({
      bgColor: theme.colors.twitterBlue,
      _hover: {
        cursor: "pointer",
      },
    }),
  },
};
