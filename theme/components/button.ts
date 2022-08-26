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
    solid: ({ theme, colorMode }: StyleFunctionProps) => ({
      borderWidth: "1px",
      borderColor: theme.colors.black,
      color: theme.colors.white,
      bg: theme.colors.black,
      _hover: {
        bg: colorMode === "dark" ? theme.colors.gray : theme.colors.darkGray,
        color: theme.colors.white,
      },
      _active: {
        bg: theme.colors.gray,
        color: theme.colors.white,
        borderColor: theme.colors.black,
      },
    }),
    outline: ({ theme, colorMode }: StyleFunctionProps) => ({
      borderWidth: "1px",
      borderColor:
        colorMode === "dark" ? theme.colors.white : theme.colors.black,
      color: colorMode === "dark" ? theme.colors.white : theme.colors.black,
      bg: "transparent",
      _hover: {
        bg: theme.colors.whiteClassic,
        color: theme.colors.black,
      },
      _active: {
        bg: theme.colors.gray,
        color: theme.colors.black,
        borderColor: theme.colors.black,
      },
    }),
    twitter: ({ theme }: StyleFunctionProps) => ({
      bg: theme.colors.twitterBlue,
      color: "#fff",
      _hover: { bg: "#1e9cf1dd", color: "#fff" },
      size: "sm",
    }),
    github: {
      size: "sm",
      bgColor: "#24292f",
      color: "#fff",
      _hover: { bgColor: "#24292fdd", color: "#fff" },
      _focus: { borderColor: "#24292f" },
    },
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
