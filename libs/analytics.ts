import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
	process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID,
	process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_SECRET_KEY,
	'http://localhost:3001/oauth2callback'
);

const scopes = 'https://www.googleapis.com/auth/analytics';

const url = oauth2Client.generateAuthUrl({
	// 'online' (default) or 'offline' (gets refresh_token)
	access_type: 'offline',

	// If you only need one scope you can pass it as a string
	scope: scopes,
});

console.log(url);
