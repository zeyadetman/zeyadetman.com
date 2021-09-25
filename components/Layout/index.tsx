import { Box, Container } from '@chakra-ui/layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

interface Props {
	children: any;
}

function Layout(props: Props) {
	const [session, loading] = useSession();
	const { children } = props;
	const router = useRouter();

	if (loading) return null;

	return (
		<Container maxW={'80ch'} px={4} py={6}>
			<Navbar user={session?.user} />
			<Box px={10} py={10}>
				{children}
			</Box>
			<Footer />
		</Container>
	);
}

export default Layout;
