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
      <VStack maxW={["5xl"]} my={6}>
        <Header />
        <Box minH={"50vh"}>
          <main>{children}</main>
        </Box>
        <Footer />
      </VStack>
    </Center>
  );
}

export default Layout;
