import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import { components } from '../styles/theme/components';
import { colors } from '../styles/theme/colors';
import { shadows } from '../styles/theme/shadows';
import Layout from '../components/Layout';
import { breakpoints } from '../styles/theme/breakpoints';
import { useRouter } from 'next/router';
import { JSXElementConstructor, ReactElement, useEffect } from 'react';
import * as gtag from '../libs/gtag';
import { DefaultSeo, LogoJsonLd } from 'next-seo';
import Script from 'next/script';
import { site } from '../configs/site';
import { NextIntlProvider } from 'next-intl';
import { RtlProvider } from '../components/rtl-provider';
import Head from 'next/head';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import type { NextPage } from 'next';

const theme = extendTheme({
	shadows,
	colors,
	components,
	breakpoints,
	fonts: {
		body: "'Tajawal', sans-serif",
		heading: "'Tajawal', sans-serif",
	},
});

type NextPageWithLayout = NextPage & {
	getLayout?: (
		page: ReactElement
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	) => ReactElement<any, string | JSXElementConstructor<any>>;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): ReactElement {
	const router = useRouter();

	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			process.env.NODE_ENV === 'production'
		) {
			LogRocket.init(
				process.env.NEXT_PUBLIC_LOGROCKET_ID || 'f16bwg/personal-site'
			);
			setupLogRocketReact(LogRocket);
		}

		const handleRouteChange = (url: URL) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	const messages = pageProps?.messages ? JSON.parse(pageProps.messages) : {};
	const getLayout =
		Component.getLayout ??
		((page) => (
			<Layout>
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
					/>
					<meta
						name="description"
						content={`${site.name}'s Space on internet.`}
					/>
					<meta name="keywords" content="personal blog, web, developer" />
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
					<link
						rel="apple-touch-icon"
						href="/icons/apple-touch-icon.png"
					></link>
					<meta name="theme-color" content="#111" />
				</Head>
				<LogoJsonLd logo="/static/images/logo.jpeg" url={site.baseUrl} />
				<DefaultSeo
					openGraph={{
						type: 'website',
						locale: 'en_IE',
						url: site.baseUrl,
						site_name: `${site.name}'s Blog`,
						images: [
							{
								url: '/static/images/logo.jpeg',
								width: 200,
								height: 200,
								alt: 'Logo',
								type: 'image/jpeg',
							},
						],
						description: `${site.name}'s Space on internet.`,
						title: `${site.name}`,
					}}
					titleTemplate={`%s | ${site.name}`}
					defaultTitle={site.name}
					twitter={{
						handle: `@${site.twitter.username}`,
						site: 'zeyadetman.com',
						cardType: 'summary_large_image',
					}}
				/>
				{page}
			</Layout>
		));

	return (
		<NextIntlProvider messages={messages}>
			<ChakraProvider theme={theme}>
				<RtlProvider>
					<Provider
						options={{
							clientMaxAge: 0,
							keepAlive: 0,
						}}
					>
						<Script
							strategy="afterInteractive"
							src="https://apis.google.com/js/api.js"
						/>

						{getLayout(<Component {...pageProps} />)}
					</Provider>
				</RtlProvider>
			</ChakraProvider>
		</NextIntlProvider>
	);
}
export default MyApp;
