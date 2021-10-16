import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Container, Divider } from '@chakra-ui/layout';
import { useSession } from 'next-auth/client';
import React, { ReactElement } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

interface Props {
	children: ReactElement[];
}

function Layout(props: Props): ReactElement | null {
	const [session, loading] = useSession();
	const { children } = props;
	const containerColor = useColorModeValue('blackLight', 'whiteDark');
	if (loading) return null;

	return (
		<Container
			maxW={'80ch'}
			px={{ lg: 4, sm: 3, xs: 2 }}
			pt={6}
			color={containerColor}
		>
			<Navbar user={session?.user} />
			<Box px={{ lg: 10, sm: 1, md: 4 }} py={10} maxW="2xl" margin="0 auto">
				{children}
			</Box>

			<Divider maxW="2xl" margin="0 auto" mt="8" />
			<Footer />
		</Container>
	);
}

export default Layout;
