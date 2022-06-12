import { Box, Link, VStack } from "@chakra-ui/react";
import config from "config";
import Image from "next/image";
import React from "react";

interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <footer>
      <VStack shouldWrapChildren>
        <Box pos="relative" w="28" h="10" mt={6}>
          <Link href={`https://twitter.com/${config.username}`}>
            <Image
              src="/signature.png"
              alt="Signature of the author"
              layout="fill"
              objectFit="contain"
              className="color-mode-respected"
            />
          </Link>
        </Box>
      </VStack>
    </footer>
  );
}

export default Footer;
