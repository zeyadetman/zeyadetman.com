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
import { ReactElement, useEffect } from 'react';
import * as gtag from '../libs/gtag';
import { DefaultSeo, LogoJsonLd } from 'next-seo';
import Script from 'next/script';
import { site } from '../configs/site';

const theme = extendTheme({
	shadows,
	colors,
	components,
	breakpoints,
});

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps): ReactElement {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			/* invoke analytics function only for production */
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<ChakraProvider theme={theme}>
			<Provider
				options={{
					clientMaxAge: 0,
					keepAlive: 0,
				}}
				session={{ ...session }}
			>
				<Script
					strategy="afterInteractive"
					src="https://apis.google.com/js/api.js"
				/>
				<Layout>
					<LogoJsonLd logo="/static/images/logo.jpeg" url={site.baseUrl} />
					<DefaultSeo
						openGraph={{
							type: 'blog',
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
						}}
						titleTemplate={`%s | ${site.name}`}
						defaultTitle={site.name}
						twitter={{
							handle: `@${site.twitter.username}`,
							site: 'zeyadetman.com',
							cardType: 'summary_large_image',
						}}
					/>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</ChakraProvider>
	);
}
export default MyApp;
