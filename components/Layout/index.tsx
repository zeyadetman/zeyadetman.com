import { Box, Container } from '@chakra-ui/layout';
import { useSession } from 'next-auth/client';
import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

interface Props {
	children: any;
}

function Layout(props: Props) {
	const [session, loading] = useSession();
	const { children } = props;

	if (loading) return null;

	return (
		<Container maxW={'80ch'} px={{ lg: 4, sm: 1 }} py={6}>
			<Navbar user={session?.user} />
			<Box px={{ lg: 10, sm: 1, md: 4 }} py={10}>
				{children}
			</Box>
			<Footer />
		</Container>
	);
}

export default Layout;
