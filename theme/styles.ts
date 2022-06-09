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
  }),
};
