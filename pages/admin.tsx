import React from 'react';
import LoginForm from '../components/Admin/LoginForm';
import { useSession, signIn, signOut, getSession } from 'next-auth/client';
import { NextPageContext } from 'next';

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
			<>
				{console.log(session)}
				Signed in as {session.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}

	return <LoginForm onSignInWithGoogle={() => signIn('google')} />;
}

export default Admin;
