import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import { ReactElement, ReactNode } from 'react';
import { site } from '../../configs/site';

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer(): ReactElement {
	return (
		<Box color={useColorModeValue('gray.700', 'gray.200')}>
			<Container
				as={Stack}
				maxW={'xl'}
				my={8}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
				justify={{ base: 'center', md: 'space-between' }}
				align={{ base: 'center', md: 'center' }}
			>
				<Text fontSize="xs">© 2021 Zeyad&apos;s Space on internet.</Text>
				<Stack direction={'row'} spacing={6}>
					<SocialButton
						label={'Twitter'}
						href={`https://twitter.com/${site.twitter.username}`}
					>
						<FaTwitter />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
}
