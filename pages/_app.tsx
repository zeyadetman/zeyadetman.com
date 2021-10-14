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
import { useEffect, useState } from 'react';
import * as gtag from '../libs/gtag';
import { DefaultSeo, LogoJsonLd } from 'next-seo';
import Script from 'next/script';

const theme = extendTheme({
	shadows,
	colors,
	components,
	breakpoints,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const router = useRouter();
	const [pageViews, setPageViews] = useState([]);

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
				session={{ ...session, pageViews }}
			>
				<Script strategy="lazyOnload">
					{`window.twttr = (function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0],
							t = window.twttr || {};
						if (d.getElementById(id)) return t;
						js = d.createElement(s);
						js.id = id;
						js.src = "https://platform.twitter.com/widgets.js";
						fjs.parentNode.insertBefore(js, fjs);

						t._e = [];
						t.ready = function(f) {
							t._e.push(f);
						};

						return t;
						}(document, "script", "twitter-wjs"));
					`}
				</Script>
				<Script
					strategy="afterInteractive"
					src="https://apis.google.com/js/api.js"
				/>
				<Layout>
					<LogoJsonLd
						logo="/static/images/logo.jpeg"
						url="https://zeyadetman.vercel.app/"
					/>
					<DefaultSeo
						openGraph={{
							type: 'blog',
							locale: 'en_IE',
							url: 'https://zeyadetman.vercel.app/',
							site_name: "Zeyad Etman's Blog",
						}}
						titleTemplate="%s | Zeyad Etman"
						defaultTitle="Zeyad Etman"
						twitter={{
							handle: '@zeyadetman',
							site: '@zeyadetman',
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
