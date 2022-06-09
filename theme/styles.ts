export const fonts = {
  heading: `'Raleway', sans-serif`,
  body: `'Raleway', sans-serif`,
};

export const customStyles = {
  global: (props: any) => ({
    "html, body": {
      color: props.colorMode === "dark" ? "white" : "gray",
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
      filter: "grayscale(0.8)",
    },
    ".autolink-svg": {
      "&:hover": {
        opacity: 0.5,
      },
    },
    ".mainPost *": {
      fontFamily: `'Sanchez', sans-serif`,
    },
    ".color-mode-respected": {
      ...(props.colorMode === "dark" ? { filter: "invert(1)" } : {}),
    },
  }),
};
