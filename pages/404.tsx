import { NextSeo } from 'next-seo';
import React from 'react';

interface Props {}

function NotFound(props: Props) {
	const {} = props;

	return (
		<>
			<NextSeo title={'404'} description={'404'} />
			Not found
		</>
	);
}

export default NotFound;
