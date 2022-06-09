import { extendTheme, styled, type ThemeConfig } from "@chakra-ui/react";
import { mergeWith } from "@chakra-ui/utils";
import { customStyles, fonts } from "theme/styles";
import components from "theme/components";
import colors from "theme/foundations/colors";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles: customStyles,
  colors,
  components,
  config,
  fonts,
});

export default theme;
