/* eslint-disable import/no-anonymous-default-export */
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

export default {
  baseStyle: ({ theme, colorMode }: StyleFunctionProps) => ({
    fontSize: ["12", "12", "10", "10"],
    fontWeight: [400, 400, 600, 600],
    background: "none",
    backgroundColor: "yellow",
    color: "black",
  }),
  variants: {
    solid: {
      background: "yellow",
      color: "black",
    },
    thread: ({ theme }: StyleFunctionProps) => ({
      bgColor: theme.colors.twitterBlue,
      _hover: {
        cursor: "pointer",
      },
    }),
  },
};
