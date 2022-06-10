import type { SystemStyleFunction } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleFunction = ({ theme, colorMode }) => ({
  background: theme.colors.black,
  color: theme.colors.white,
  w: "fit-content",
  fontSize: "xs",
  marginEnd: 3,
  mb: 0,
  py: 1.5,
  px: 3,
  fontWeight: "medium",
  transitionProperty: "common",
  transitionDuration: "normal",
  opacity: 1,
  _disabled: {
    opacity: 0.4,
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  baseStyle,
};
