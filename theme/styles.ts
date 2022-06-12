export const fonts = {
  heading: `'Raleway', sans-serif`,
  body: `'Raleway', sans-serif`,
};

export const customStyles = {
  global: ({ theme, colorMode }: any) => ({
    "html, body": {
      color:
        colorMode === "dark"
          ? theme.colors.whiteDarkMode
          : theme.colors.blueClassic,
      backgroundColor:
        colorMode === "dark"
          ? theme.colors.blueClassic
          : theme.colors.whiteClassic,
      padding: 0,
      margin: 0,
    },
    "*": {
      boxSizing: "border-box",
    },
    a: {
      color: "inherit",
      textDecoration: "none",
    },
    ".meImage": {
      filter: "grayscale(0.4)",
    },
    ".autolink-svg": {
      "&:hover": {
        opacity: 0.5,
      },
    },
    ".mainPost": {
      fontFamily: `'Sanchez', sans-serif`,
    },
    ".color-mode-respected": {
      ...(colorMode === "dark" ? { filter: "invert(1)" } : {}),
    },
    ".pre-code & .token-line": {
      height: "1.3em",
      lineHeight: "1.3em",
    },
  }),
};
