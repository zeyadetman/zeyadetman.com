import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';

interface Props {}

function BlogIndex(props: Props) {
	const router = useRouter();
	console.log(router);
	console.log({ props });

	return <Layout>dasd</Layout>;
}

export default BlogIndex;
