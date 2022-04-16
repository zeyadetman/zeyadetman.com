import React, { ReactElement, useState } from 'react';
import {
	Stack,
	Text,
	Heading,
	Box,
	HStack,
	Flex,
	Icon,
	VStack,
} from '@chakra-ui/react';
import { Img } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { IPic } from '../interfaces/picture';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { trackEvent } from '../libs/gtag';
import { EVENTS, EVENTS_CATEGORIES } from '../utils/events';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useTranslations } from 'use-intl';
import GalleryContainer from 'react-photo-gallery';
import { FiX, FiMapPin, FiFileText } from 'react-icons/fi';
import { customStyles } from '../styles/styles';

interface IProps {
	images: IPic[];
}

export async function getStaticProps({
	locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<unknown>> {
	const messages = await import(`/messages/${locale}.json`);

	const photos = await (await fetch("https://api.500px.com/graphql", {
  "headers": {
    "content-type": "application/json",
  },
  "referrer": "https://500px.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"operationName\":\"OtherPhotosQuery\",\"variables\":{\"username\":\"zeyadetman\",\"pageSize\":20},\"query\":\"query OtherPhotosQuery($username: String!, $pageSize: Int) {\\n  user: userByUsername(username: $username) {\\n    ...OtherPhotosPaginationContainer_user_RlXb8\\n    id\\n  }\\n}\\n\\nfragment OtherPhotosPaginationContainer_user_RlXb8 on User {\\n  photos(first: $pageSize, privacy: PROFILE, sort: ID_DESC) {\\n    edges {\\n      node {\\n        id\\n        legacyId\\n        canonicalPath\\n        width\\n        height\\n        name\\n        isLikedByMe\\n        notSafeForWork\\n        photographer: uploader {\\n          id\\n          legacyId\\n          username\\n          displayName\\n          canonicalPath\\n          followedByUsers {\\n            isFollowedByMe\\n          }\\n        }\\n        images(sizes: [33, 35]) {\\n          size\\n          url\\n          jpegUrl\\n          webpUrl\\n          id\\n        }\\n        __typename\\n      }\\n      cursor\\n    }\\n    totalCount\\n    pageInfo {\\n      endCursor\\n      hasNextPage\\n    }\\n  }\\n}\\n\"}",
  "method": "POST",
})).json();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const images = photos.data.user.photos?.edges?.reverse().map((edge: any) => {
		return {
			id: edge?.node?.id,
			image: {
				url: edge?.node?.images[1]?.url,
				webpUrl: edge?.node?.images[1]?.webpUrl,
			},
			name: edge?.node?.name,
			location: edge?.node?.location,
			width: edge?.node?.width,
			height: edge?.node?.height,
			description: edge?.node?.description,
		};
	});

	return {
		props: {
			messages: JSON.stringify(messages),
			images,
		},
	};
}

function Gallery(props: IProps): ReactElement {
	const { images } = props;
	const [selectedImage, selectImage] = useState<null | IPic>(null);
	const t = useTranslations('Gallery');

	return (
		<>
			<NextSeo title={'Gallery'} description={"Photos I've taken"} />
			<Stack>
				<Heading color={useColorModeValue('black', 'white')}>
					{t('gallery')}
					<Text {...customStyles.Text.subTitle()}>
						{t('galleryInfo')}{' '}
						<Text fontWeight="bold" display="inline">
							{t('byIphone11')}
						</Text>
						.
					</Text>
				</Heading>
			</Stack>

			<Box mt="12" spacing={2} justify="center">
				<VStack width="full" display={selectedImage ? 'none' : ''}>
					<GalleryContainer
						photos={images.map((i) => ({
							...i,
							src: i.image.url,
						}))}
						direction={'row'}
						renderImage={(record) => {
							return (
								// eslint-disable-next-line
								// @ts-ignore
								<Img
									onClick={() => {
										trackEvent({
											action: EVENTS.ENLARGE_IMAGE,
											// eslint-disable-next-line
											// @ts-ignore
											label: `Image: ${record.photo?.name}`,
											category: EVENTS_CATEGORIES.MID,
										});
										// eslint-disable-next-line
										// @ts-ignore
										selectImage(record.photo);
									}}
									{...record.photo}
									style={{ margin: record.margin }}
								/>
							);
						}}
					/>
				</VStack>

				<VStack width="full" display={!selectedImage ? 'none' : ''}>
					<HStack justify="end" width="full">
						<Icon
							as={FiX}
							onClick={() => {
								selectImage(null);
							}}
							fontSize="3xl"
							cursor="pointer"
							color={useColorModeValue('black', 'white')}
						/>
					</HStack>
					<Flex align="center" justify="center">
						<Img
							src={selectedImage?.image?.webpUrl}
							alt={selectedImage?.name}
						/>
					</Flex>
					<Text
						fontSize="2xl"
						fontWeight="bold"
						textTransform="capitalize"
						mt="24px !important"
						mb="0 !important"
						align="center"
						color={useColorModeValue('black', 'white')}
					>
						{selectedImage?.name}
					</Text>

					{selectedImage?.location ? (
						<Text
							fontSize="sm"
							fontWeight="medium"
							mt="0 !important"
							align="center"
						>
							<Icon as={FiMapPin} title={t('location')} />{' '}
							{selectedImage?.location}
						</Text>
					) : null}

					{selectedImage?.description ? (
						<Text
							fontSize="sm"
							fontWeight="medium"
							mt="6px !important"
							align="center"
						>
							<Icon as={FiFileText} title={t('description')} />{' '}
							{selectedImage?.description}
						</Text>
					) : null}
				</VStack>
			</Box>
		</>
	);
}

export default Gallery;
