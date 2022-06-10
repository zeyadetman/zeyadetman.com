import { Box, Icon, useColorMode, VStack } from "@chakra-ui/react";
import NavList from "components/Header/NavList";
import Heading from "components/Heading";
import Link from "components/Link";
import config from "config";
import React from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

interface Props {}

function Header(props: Props) {
  const { colorMode, setColorMode } = useColorMode();
  const {} = props;

  return (
    <Box as="header" w="100%">
      <VStack spacing={4} textAlign="center">
        <Heading type="h1" letterSpacing="wide">
          <Link href="/" chackraProps={{ variant: "title" }}>
            {config.name}
          </Link>
        </Heading>
        <Heading type="h2" letterSpacing="wide" size={["sm", "md", "md", "lg"]}>
          {config.description}{" "}
          <Icon
            as={colorMode === "light" ? IoMoonOutline : IoSunnyOutline}
            name="menu"
            fontSize={"xl"}
            onClick={() => {
              setColorMode(colorMode === "light" ? "dark" : "light");
            }}
            display="inline"
          />
        </Heading>
      </VStack>
      <NavList />
    </Box>
  );
}

export default Header;
