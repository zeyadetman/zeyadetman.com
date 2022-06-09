import { Box, Center, HStack, List, ListItem, VStack } from "@chakra-ui/react";
import NavList from "components/Header/NavList";
import Heading from "components/Heading";
import Link from "components/Link";
import config from "config";
import React from "react";

interface Props {}

function Header(props: Props) {
  const {} = props;

  return (
    <header>
      <VStack spacing={4} textAlign="center">
        <Heading type="h1">
          <Link href="/">{config.name}</Link>
        </Heading>
        <Heading type="h2" size={["sm", "md", "md", "lg"]}>
          {config.description}
        </Heading>
      </VStack>
      <NavList />
    </header>
  );
}

export default Header;
