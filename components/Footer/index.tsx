import { Box, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <footer>
      <VStack shouldWrapChildren>
        <Box pos="relative" w="28" h="10">
          <Image
            src="/signature.png"
            alt="Signature of the author"
            layout="fill"
            objectFit="contain"
          />
        </Box>
      </VStack>
    </footer>
  );
}

export default Footer;
