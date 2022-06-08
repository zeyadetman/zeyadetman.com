export const fonts = {
  heading: `'Raleway', sans-serif`,
  body: `'Raleway', sans-serif`,
};

export const customStyles = {
  global: (props: any) => ({
    "html, body": {
      color: props.colorMode === "dark" ? "white" : "gray",
    },
    a: {
      // color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
    },
  }),
};
