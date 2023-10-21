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
        "linear-gradient(45deg,hsl(0deg 0% 80%) 0%, hsl(344deg 0% 82%) 11%, hsl(344deg 0% 84%) 22%, hsl(344deg 0% 86%) 33%, hsl(344deg 0% 89%) 44%, hsl(344deg 0% 91%) 56%, hsl(344deg 0% 93%) 67%, hsl(344deg 0% 95%) 78%, hsl(344deg 0% 98%) 89%, hsl(0deg 0% 100%) 100%)",
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
