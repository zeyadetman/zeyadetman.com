/* eslint-disable import/no-anonymous-default-export */

import { StyleFunctionProps } from "@chakra-ui/theme-tools";

export default {
  baseStyle: ({ theme }: any) => ({
    fontFamily: `"Sanchez", sans-serif`,
  }),
  variants: {
    inline: ({ theme, colorMode }: StyleFunctionProps) => ({
      fontFamily: `"Sanchez", sans-serif`,
      bg: colorMode === "dark" ? theme.colors.darkGray : theme.colors.lightGray,
    }),
  },
};
