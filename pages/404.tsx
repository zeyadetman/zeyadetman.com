import { Box, Center, Text, VStack } from "@chakra-ui/react";
import Heading from "components/Heading";
import Image from "next/image";
import React from "react";

interface Props {}

function Custom404(props: Props) {
  const {} = props;

  return (
    <VStack
      minH="inherit"
      minW="inherit"
      display="flex"
      alignItems="center"
      justifyContent="center"
      spacing="8"
    >
      <Box pos="relative" width="100%" h="48">
        <Image
          src="/assets/illustrations/empty.svg"
          alt="Empty state"
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Heading type="h2" size="md">
        Cannot find this page on Earth!
      </Heading>
    </VStack>
  );
}

export default Custom404;
