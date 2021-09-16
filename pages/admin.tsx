import { useColorModeValue } from '@chakra-ui/color-mode';
import { Container } from '@chakra-ui/layout';
import React from 'react';
import LoginForm from '../components/Admin/LoginForm';
import { useSession, signIn, signOut, getSession } from 'next-auth/client';
import { google } from 'googleapis';
import { NextPageContext } from 'next';
import Layout from '../components/Layout';

interface Props {}

export async function getServerSideProps(ctx: NextPageContext) {
	const session = await getSession(ctx);
	console.log({ session });

	return {
		props: {
			google: 'JSON.stringify(drive)',
		},
	};
}

function Admin(props: { google: string }) {
	const [session, loading] = useSession();
	const { google } = props;
	console.log({ google });

	if (loading) return null;
	if (session) {
		return (
			<Layout>
				{console.log(session)}
				Signed in as {session.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</Layout>
		);
	}

	return (
		<Layout>
			<LoginForm onSignInWithGoogle={() => signIn('google')} />
		</Layout>
		// <Container
		// 	maxW="100%"
		// 	height="100vh"
		// 	position="relative"
		// 	centerContent
		// 	bg={useColorModeValue('gray.50', 'gray.800')}
		// >
		// </Container>
	);
}

export default Admin;
