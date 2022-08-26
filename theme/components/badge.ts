/* eslint-disable import/no-anonymous-default-export */
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

export default {
  baseStyle: ({ theme }: StyleFunctionProps) => ({
    variant: "outline",
    fontSize: ["12", "12", "10", "10"],
    fontWeight: [400, 400, 600, 600],
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
