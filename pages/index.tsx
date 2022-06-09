import { Box, VStack } from "@chakra-ui/react";
import Heading from "components/Heading";
import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
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
          src="/assets/illustrations/home.svg"
          alt="Home"
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Heading type="h2" size="md">
        Home Page!
      </Heading>
    </VStack>
  );
};

export default Home;
