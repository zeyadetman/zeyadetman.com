import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';

function NotFound(): ReactElement {
	return (
		<>
			<NextSeo title={'404'} description={'404'} />
			Not found
		</>
	);
}

export default NotFound;
