import { Box, Icon, useColorMode, VStack } from "@chakra-ui/react";
import NavList from "components/Header/NavList";
import Heading from "components/Heading";
import Link from "components/Link";
import config from "config";
import Image from "next/image";
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
          <Box
            pos="relative"
            w="14"
            h="14"
            display={["none", "inline-block", "inline-block", "inline-block"]}
          >
            <Image
              src="/logo.png"
              alt="Home"
              layout="fill"
              objectFit="contain"
              className="color-mode-respected"
              priority
            />
          </Box>
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
