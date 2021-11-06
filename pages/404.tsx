import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';

export async function getStaticProps({
	locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<unknown>> {
	const messages = await import(`/messages/${locale}.json`);
	return {
		props: {
			messages: JSON.stringify(messages),
		},
	};
}

function NotFound(): ReactElement {
	return (
		<>
			<NextSeo title={'404'} description={'404'} />
			Not found
		</>
	);
}

export default NotFound;
