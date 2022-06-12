import { Box, VStack } from "@chakra-ui/react";
import Heading from "components/Heading";
import Image from "next/image";
import React from "react";
import { NextSeo } from "next-seo";

function Custom404() {
  return (
    <>
      <NextSeo title={"404"} description={"404"} />
      <VStack
        minH="inherit"
        minW="inherit"
        display="flex"
        alignItems="center"
        justifyContent="center"
        spacing="8"
        textAlign="center"
      >
        <Box pos="relative" width="100%" h="48">
          <Image
            src="/assets/illustrations/empty.svg"
            alt="Empty state"
            layout="fill"
            objectFit="contain"
            className="color-mode-respected"
          />
        </Box>
        <Heading type="h2" size="md">
          Cannot find this page on Earth!
        </Heading>
      </VStack>
    </>
  );
}

export default Custom404;
