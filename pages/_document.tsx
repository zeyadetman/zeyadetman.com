import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';
import { GA_TRACKING_ID } from '../libs/gtag';
const isProduction = process.env.NODE_ENV === 'production';

export default class MyDocument extends Document {
	//eslint-disable-next-line
	static async getInitialProps(ctx: DocumentContext) {
		return await Document.getInitialProps(ctx);
	}

	render(): JSX.Element {
		const { locale } = this.props.__NEXT_DATA__;
		const dir = locale === 'ar' ? 'rtl' : 'ltr';

		return (
			<Html dir={dir} lang={locale}>
				<Head>
					<script async src="https://platform.twitter.com/widgets.js" />
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

					{locale === 'ar' && (
						<>
							<link rel="preconnect" href="https://fonts.googleapis.com"></link>
							<link
								rel="preconnect"
								href="https://fonts.gstatic.com"
								crossOrigin="*"
							></link>
							<link
								href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
								rel="stylesheet"
							></link>
						</>
					)}
				</body>
			</Html>
		);
	}
}
