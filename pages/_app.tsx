import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/raleway/400.css";
import "@fontsource/sanchez/400.css";
import theme from "theme";
import { NextPage } from "next";
import { ReactNode, ReactElement } from "react";
import Layout from "components/Layout";
import { MDXProvider } from "@mdx-js/react";
import mdxComponentsMapping from "mdxConfig/components";
import config from "config";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1"
        />
        <meta
          name="description"
          content={`${config.name}'s Space on internet.`}
        />
        <meta
          name="keywords"
          content="personal blog, web, developer, life thoughts, zeyad etman, zeyadetman, software"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
        <meta name="theme-color" content="#111" />
      </Head>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: config.baseUrl,
          site_name: `${config.name}'s Blog`,
          images: [
            {
              url: "/icons/icon-192x192.png",
              width: 192,
              height: 192,
              alt: "Logo",
              type: "image/png",
            },
          ],
          description: `${config.name}'s Space on internet.`,
          title: `${config.name}`,
        }}
        titleTemplate={`%s | ${config.name}`}
        defaultTitle={config.name}
        twitter={{
          handle: `@${config.username}`,
          site: "zeyadetman.com",
          cardType: "summary_large_image",
        }}
      />
      <ChakraProvider theme={theme}>
        <MDXProvider components={mdxComponentsMapping}>
          {getLayout(<Component {...pageProps} />)}
        </MDXProvider>
      </ChakraProvider>

      <Analytics />
    </>
  );
}
