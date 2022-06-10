/* eslint-disable import/no-anonymous-default-export */

export default {
  baseStyle: {
    fontFamily: `'Sanchez', sans-serif`,
  },
  sizes: {
    md: {
      field: {
        borderRadius: "0px",
        fontSize: "md",
        w: "100%",
      },
    },
  },
  variants: {
    outline: ({ theme, colorMode }: any) => ({
      field: {
        background: theme.colors.white,
        border: "1px solid",
        padding: "12px 12px",
        color: theme.colors.black,
        boxSizing: "border-box",
        fontSize: "sm",
        _placeholder: {
          color: theme.colors.gray,
        },
        _hover: {
          borderColor:
            colorMode === "dark" ? theme.colors.white : theme.colors.black,
        },
        _focus: {
          borderColor:
            colorMode === "dark" ? theme.colors.white : theme.colors.black,
          boxShadow: "none",
          boxSizing: "border-box",
        },
      },
    }),
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};
