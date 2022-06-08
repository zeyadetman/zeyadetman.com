import { Center, VStack } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <Center h="100vh">
      <VStack>
        <Header />
        asd
        <main>{children}</main>
        <Footer />
      </VStack>
    </Center>
  );
}

export default Layout;
