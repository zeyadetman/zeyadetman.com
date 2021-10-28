import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from '@chakra-ui/react';
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import { DiStackoverflow } from 'react-icons/di';
import { HiOutlineMail } from 'react-icons/hi';
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
				<Stack direction={'row'} spacing={1}>
					{site.twitter.username && (
						<SocialButton
							label={'Twitter'}
							href={`https://twitter.com/${site.twitter.username}`}
						>
							<FiTwitter />
						</SocialButton>
					)}
					{site.social.linkedin && (
						<SocialButton
							label={'Linkedin'}
							href={`https://www.linkedin.com/in/${site.social.linkedin}`}
						>
							<FiLinkedin />
						</SocialButton>
					)}
					{site.social.stackoverflow && (
						<SocialButton
							label={'Stack Overflow'}
							href={`https://stackoverflow.com/users/${site.social.stackoverflow}`}
						>
							<DiStackoverflow />
						</SocialButton>
					)}
					{site.social.github && (
						<SocialButton
							label={'Github'}
							href={`https://www.github.com/${site.social.github}`}
						>
							<FiGithub />
						</SocialButton>
					)}
					{site.email && (
						<SocialButton label={'Email'} href={`mailto:${site.email}`}>
							<HiOutlineMail />
						</SocialButton>
					)}
				</Stack>
			</Container>
		</Box>
	);
}
