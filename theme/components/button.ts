import { StyleFunctionProps } from "@chakra-ui/theme-tools";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  baseStyle: ({ theme }: StyleFunctionProps) => ({
    borderRadius: "0px",
  }),
  sizes: {
    md: {
      border: "none",
      boxSizing: "border-box",
      borderColor: "black",
      padding: "8px 18px",
      fontSize: "md",
    },
  },
  variants: {
    solid: ({ theme }: StyleFunctionProps) => ({
      borderColor: theme.colors.black,
      color: theme.colors.white,
      bg: theme.colors.black,
      _hover: {
        bg: theme.colors.gray,
        color: theme.colors.white,
      },
      _active: {
        bg: theme.colors.gray,
        color: theme.colors.white,
        borderColor: theme.colors.black,
      },
    }),
    ghost: {
      _hover: {
        bg: "transparent",
      },
      _active: {
        bg: "transparent",
      },
      _focus: {
        bg: "transparent",
      },
    },
  },
};
