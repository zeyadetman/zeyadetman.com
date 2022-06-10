import { StyleFunctionProps } from "@chakra-ui/theme-tools";

/* eslint-disable import/no-anonymous-default-export */
export default {
  baseStyle: ({ theme }: StyleFunctionProps) => ({
    textDecoration: "none",
    _hover: {
      textDecoration: "underline",
    },
  }),
  variants: {
    title: {
      _hover: {
        textDecoration: "none",
      },
    },
    postLink: ({ theme }: StyleFunctionProps) => ({
      textDecoration: "none",
      color: theme.colors.red,
      _hover: {
        textDecoration: "underline",
      },
    }),
  },
};
