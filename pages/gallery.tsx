import React, { useState } from 'react';
import {
	Stack,
	Text,
	Heading,
	WrapItem,
	Wrap,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Flex,
} from '@chakra-ui/react';
import { Img } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { NextSeo } from 'next-seo';
import { IPic } from '../interfaces/picture';

interface Props {}

const pictures: IPic[] = [
	{
		src: '/static/gallery/sea-and-boat-min.jpg',
		description: 'Boat in the sea',
		alt: 'Boat in the sea',
	},
	{
		src: '/static/gallery/plants-min.jpg',
		description: 'Plant',
		alt: 'Plant',
	},
	{
		src: '/static/gallery/laptop-min.jpg',
		description: 'Laptop',
		alt: 'Laptop',
	},
	{
		src: '/static/gallery/sea-in-night-min.jpg',
		description: 'sea in night',
		alt: 'sea in night',
	},
];

function Gallery(props: { google: string }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedImage, selectImage] = useState(0);

	return (
		<>
			<NextSeo title={'Gallery'} description={"Photos I've taken"} />
			<Stack>
				<Heading>
					Gallery
					<Text fontSize="sm" marginTop="4" fontWeight="normal">
						Photos I've taken, all of them{' '}
						<Text fontWeight="bold" display="inline">
							captured by iPhone11
						</Text>
						.
					</Text>
				</Heading>
			</Stack>

			<Wrap mt="12" spacing={2} justify="center">
				{pictures.map((pic: IPic, index) => (
					<WrapItem
						key={pic.src}
						boxShadow="base"
						rounded="5px"
						overflow="hidden"
						maxW="xs"
						width="fit-content"
						height="fit-content"
						bg="white"
						lineHeight="0"
						_hover={{ boxShadow: 'md' }}
						onClick={() => {
							selectImage(index);
							onOpen();
						}}
					>
						<Img
							src={pic.src}
							alt={pic.alt}
							fit="contain"
							maxWidth="sm"
							maxHeight="sm"
						/>
					</WrapItem>
				))}
			</Wrap>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size="full"
				scrollBehavior="inside"
				isCentered
				allowPinchZoom
				blockScrollOnMount
			>
				<ModalOverlay />
				<ModalContent backgroundColor="black" borderRadius="0">
					<ModalCloseButton color="white" />
					<ModalBody>
						<Flex align="center" justify="center">
							<Img
								src={pictures[selectedImage].src}
								alt={pictures[selectedImage].description}
								fit="contain"
								maxH="calc(100vh - 20px)"
							/>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default Gallery;
