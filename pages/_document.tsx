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
							<script>
								{`!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
// Insert Twitter Pixel ID and Standard Event data below
twq('init','o33ed');
twq('track','PageView');`}
							</script>
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
