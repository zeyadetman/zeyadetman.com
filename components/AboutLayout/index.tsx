import { Box, VStack } from "@chakra-ui/react";
import Heading from "components/Heading";
import config from "config";
import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function AboutLayout(props: Props) {
  const { children } = props;

  return (
    <VStack spacing={4} m="0">
      <Box pos="relative" width="100%" height="48">
        <Image
          src="/me.png"
          alt="Me"
          layout="fill"
          objectFit="contain"
          className="meImage"
        />
      </Box>
      <Heading type="h2" size="lg">
        Hey, It&apos;s {config.firstName}!
      </Heading>
      <Box>{children}</Box>
    </VStack>
  );
}

export default AboutLayout;
