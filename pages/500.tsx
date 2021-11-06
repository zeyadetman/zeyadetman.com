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

function Error500(): ReactElement {
	return (
		<>
			<NextSeo title={'500'} description={'500'} />
			Something went wrong.
		</>
	);
}

export default Error500;
