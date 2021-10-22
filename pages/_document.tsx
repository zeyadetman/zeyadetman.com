import Document, { Head, Html, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../libs/gtag';
const isProduction = process.env.NODE_ENV === 'production';

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					{isProduction && (
						<>
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
							/>
							<script
								// eslint-disable-n/blogext-line react/no-danger
								dangerouslySetInnerHTML={{
									__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
