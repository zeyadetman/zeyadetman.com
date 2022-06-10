import {
  Box,
  Center,
  HStack,
  List,
  ListItem,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import NavList from "components/Header/NavList";
import Heading from "components/Heading";
import Link from "components/Link";
import config from "config";
import React from "react";

interface Props {}

function Header(props: Props) {
  const { colorMode, setColorMode } = useColorMode();
  const {} = props;

  return (
    <Box as="header" w="100%">
      <VStack spacing={4} textAlign="center">
        <Heading type="h1">
          <Link href="/" chackraProps={{ _hover: { textDecoration: "none" } }}>
            {config.name}
          </Link>
        </Heading>
        <Heading type="h2" size={["sm", "md", "md", "lg"]}>
          {config.description}
        </Heading>
        <Text
          onClick={() => {
            setColorMode(colorMode === "light" ? "dark" : "light");
          }}
        >
          switch to {colorMode}
        </Text>
      </VStack>
      <NavList />
    </Box>
  );
}

export default Header;
