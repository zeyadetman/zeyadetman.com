import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			scope:
				'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file',
		}),
	],
	callbacks: {
		async jwt(token, user, account) {
			if (account?.accessToken) {
				token.accessToken = account.accessToken;
			}
			return token;
		},
		async session(session, token) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
	secret: process.env.SECRET,
	session: {
		jwt: true,
	},
	events: {},
	theme: 'light',
	debug: false,
});
