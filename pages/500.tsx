import { NextSeo } from "next-seo";
import React, { ReactElement } from "react";
import { Box, VStack } from "@chakra-ui/react";
import Heading from "components/Heading";
import Image from "next/image";

function Error500(): ReactElement {
  return (
    <>
      <NextSeo title={"500"} description={"500"} />
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
            src="/assets/illustrations/500.svg"
            alt="wrong state"
            layout="fill"
            objectFit="contain"
            className="color-mode-respected"
          />
        </Box>
        <Heading type="h2" size="md">
          Something went wrong.
        </Heading>
      </VStack>
    </>
  );
}

export default Error500;
