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
          : theme.colors.themeDark,
      backgroundColor:
        colorMode === "dark" ? theme.colors.themeDark : theme.colors.themeLight,
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
    ".logo-container": {
      maxWidth: "200px",
      borderRadius: "20px",
      backgroundImage:
        "linear-gradient( 45deg, hsl(355deg 76% 57%) 0%, hsl(5deg 79% 60%) 11%, hsl(12deg 83% 61%) 22%, hsl(18deg 87% 63%) 33%, hsl(23deg 89% 65%) 44%, hsl(28deg 91% 67%) 56%, hsl(32deg 93% 70%) 67%, hsl(37deg 94% 73%) 78%, hsl(41deg 96% 77%) 89%, hsl(47deg 100% 81%) 100% )",
      "& .color-mode-respected": {
        filter: "invert(0)",
      },
    },
    ".pre-code & .token-line": {
      height: "1.3em",
      lineHeight: "1.3em",
    },
    figure: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    "figure > img": {
      maxWidth: "340px",
    },
    figcaption: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 2,
      paddingBottom: 15,
    },
  }),
};
