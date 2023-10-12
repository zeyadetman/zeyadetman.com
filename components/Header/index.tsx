import { Box, useMediaQuery, VStack } from "@chakra-ui/react";
import NavList from "components/Header/NavList";
import Heading from "components/Heading";
import Link from "components/Link";
import config from "config";
import Image from "next/image";
import React from "react";

function Header() {
  const [isMob] = useMediaQuery("(max-width: 480px)");

  return (
    <Box as="header" w="100%">
      <VStack spacing={isMob ? 2 : 4} textAlign="center">
        {isMob && (
          <Box className="logo-container" pos="relative" w="20" h="20">
            <Image
              src="/logo.png"
              alt="Home"
              layout="fill"
              objectFit="contain"
              className="color-mode-respected"
              priority
            />
          </Box>
        )}
        <Heading type="h1" letterSpacing="wide">
          <Link href="/" chackraProps={{ variant: "title" }}>
            {config.name}
          </Link>
          {!isMob && (
            <Box className="logo-container" pos="relative" w="14" h="14">
              <Image
                src="/logo.png"
                alt="Home"
                layout="fill"
                objectFit="contain"
                className="color-mode-respected"
                priority
              />
            </Box>
          )}
        </Heading>
        <Heading type="h2" letterSpacing="wide" size={["sm", "md", "md", "lg"]}>
          {config.description}
        </Heading>
      </VStack>
      <NavList />
    </Box>
  );
}

export default Header;
