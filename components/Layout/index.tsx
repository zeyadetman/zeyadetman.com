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
	const [disable, setEnabled] = useState(true);
	const { children } = props;
	const router = useRouter();

	//remove this
	if (loading) return null;
	if (localStorage.getItem('zoz') === 'hacker') {
		setEnabled(false);
	} else {
		if (router.asPath !== '/') {
			router.push('/');
		}
	}

	return disable ? null : (
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
