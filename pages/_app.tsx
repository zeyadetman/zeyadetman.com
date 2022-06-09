import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/raleway/400.css";
import theme from "theme";
import { NextPage } from "next";
import { ReactNode, ReactElement } from "react";
import Layout from "components/Layout";
import { MDXProvider } from "@mdx-js/react";
import mdxComponentsMapping from "mdxConfig/components";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={mdxComponentsMapping}>
        {getLayout(<Component {...pageProps} />)}
      </MDXProvider>
    </ChakraProvider>
  );
}
