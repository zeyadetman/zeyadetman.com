import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import { components } from '../styles/theme/components';
import { colors } from '../styles/theme/colors';
import { shadows } from '../styles/theme/shadows';

const theme = extendTheme({
	shadows,
	colors,
	components,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Provider
				options={{
					clientMaxAge: 0,
					keepAlive: 0,
				}}
				session={session}
			>
				<Component {...pageProps} />
			</Provider>
		</ChakraProvider>
	);
}
export default MyApp;
