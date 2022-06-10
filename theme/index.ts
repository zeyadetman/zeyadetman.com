import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { customStyles, fonts } from "theme/styles";
import components from "theme/components";
import colors from "theme/foundations/colors";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  components,
  styles: customStyles,
  colors,
  config,
  fonts,
});

export default theme;
