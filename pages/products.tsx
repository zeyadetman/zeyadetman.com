import {
	Box,
	Button,
	Heading,
	Icon,
	Stack,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useTranslations } from 'next-intl';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { TwitterShareButton } from 'react-share';
import { site } from '../configs/site';
import { customStyles } from '../styles/styles';

export async function getStaticProps({
	locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<unknown>> {
	const messages = await import(`/messages/${locale}.json`);
	return { props: { messages: JSON.stringify(messages) } };
}

function Products(): React.ReactElement {
	const t = useTranslations('Products');
	const router = useRouter();

	return (
		<>
			<Script src="https://gumroad.com/js/gumroad-embed.js" async></Script>
			<NextSeo title={'Products'} description={"Products I've created."} />
			<Stack>
				<Heading color={useColorModeValue('black', 'white')}>
					{t('products')}
					<Text {...customStyles.Text.subTitle()}>{t('productsInfo')}</Text>
				</Heading>
			</Stack>

			<VStack mt="12">
				<Box spacing={2} justify="center" className="gumroad-product-embed">
					<Stack py={4}>
						<a href="https://zeyadetman.gumroad.com/l/year-resolution-template">
							Loading...
						</a>
					</Stack>
				</Box>

				<TwitterShareButton
					title={'Buy this Product: Year Resolution Template'}
					via={'zeyadetman'}
					url={`${site.baseUrl}/${router.locale}${router.asPath}`}
					key="twitter-share-button"
				>
					<Button
						bg="#1d9bf0"
						color="#fff"
						_hover={{ bg: '#1e9cf1dd', color: '#fff' }}
						size="sm"
						key="twitter"
					>
						<Icon as={AiOutlineTwitter} me={1} mb={0.5} fontSize="lg" />
						{t('tweetIt')}
					</Button>
				</TwitterShareButton>
			</VStack>
		</>
	);
}

export default Products;
