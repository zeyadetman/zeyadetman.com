import { useColorModeValue } from '@chakra-ui/color-mode';
import { Container } from '@chakra-ui/layout';
import React from 'react';
import LoginForm from '../components/Admin/LoginForm';
import { useSession, signIn, signOut, getSession } from 'next-auth/client';
import { google } from 'googleapis';
import { NextPageContext } from 'next';

interface Props {}

export async function getServerSideProps(ctx: NextPageContext) {
	const session = await getSession(ctx);
	console.log({ session });
	// Call an external API endpoint to get posts
	// const drive = google.drive({
	// 	version: 'v3',
	// 	headers: {
	// 		Authorization:
	// 			'Bearer ya29.a0ARrdaM-KnDRTh6dtmXXVfdgDfJlF37KfcWaPdAnQqs8XGaHn6Rdvn7qJexUKLBgswqhkEs6z1GushLpEC7l50XlOKa9NkmzY3_YL5jQVFqpoGGmOkYON2ZqHhbajPOr_fBRGDUPKcZWr09121F_QG4bpbG8r',
	// 	},
	// });

	// var fileMetadata = {
	// 	name: 'BlogData',
	// 	mimeType: 'application/vnd.google-apps.folder',
	// };
	// drive.files.create(
	// 	{
	// 		resource: fileMetadata,
	// 		fields: 'id',
	// 	},
	// 	function (err, file) {
	// 		if (err) {
	// 			// Handle error
	// 			console.error(err);
	// 		} else {
	// 			console.log({ file });
	// 			console.log('Folder Id: ', file.id);
	// 		}
	// 	}
	// );

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			google: 'JSON.stringify(drive)',
		},
	};
}

function Admin(props: Props) {
	const [session, loading] = useSession();
	const { google } = props;
	console.log({ google });

	if (loading) return 'Loading...';
	if (session) {
		return (
			<>
				{console.log(session)}
				Signed in as {session.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}

	return (
		<Container
			maxW="100%"
			height="100vh"
			position="relative"
			centerContent
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<LoginForm onSignInWithGoogle={() => signIn('google')} />
			<button onClick={async () => {}}>Click</button>
		</Container>
	);
}

export default Admin;
