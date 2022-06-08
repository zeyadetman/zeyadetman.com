import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { fonts } from "theme/styles";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, fonts });

export default theme;
