import { Box, VStack } from "@chakra-ui/react";
import Heading from "components/Heading";
import Layout from "components/Layout";
import config from "config";
import Image from "next/image";
import React from "react";

interface Props {}

function About(props: Props) {
  const {} = props;

  return (
    <VStack>
      <Heading type="h2" size="lg">
        <Box pos="relative" width="100%" height="48" mb={4}>
          <Image
            src="/me.png"
            alt="Me"
            layout="fill"
            objectFit="contain"
            className="meImage"
          />
        </Box>
        Hey, It&apos;s {config.firstName}!
      </Heading>
    </VStack>
  );
}

export default About;
