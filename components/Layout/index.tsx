import { Box, Center, VStack } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <Center>
      <VStack maxW={["5xl"]} my={6} spacing={[12, 6]}>
        <Header />
        <Box as="main" minH={"calc(100vh - 350px)"}>
          {children}
        </Box>
        <Footer />
      </VStack>
    </Center>
  );
}

export default Layout;
