import { ReactElement, ReactNode } from 'react';
import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useDisclosure,
	useColorModeValue,
	Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { signOut } from 'next-auth/client';
import ColorModeIcon from '../ColorModeIcon';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import Image from 'next/image';

const authLinks = [
	{ name: 'Dashboard', url: '/dashboard' },
	{ name: 'Settings', url: '/settings' },
];

const visitorLinks = [
	{ name: 'About', url: '/' },
	{ name: 'Blog', url: '/posts' },
	{ name: 'Gallery', url: '/gallery' },
];

const NavLink = ({ children, url }: { children: ReactNode; url: string }) => {
	const router = useRouter();

	return (
		<Link
			variant="nav"
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			textDecoration={
				(router?.pathname === '/' && url === '/') ||
				(router?.pathname?.includes(url) && url !== '/')
					? 'underline'
					: ''
			}
			href={url}
			onClick={(e) => {
				e.preventDefault();
				router.push(url);
			}}
			as="a"
		>
			{children}
		</Link>
	);
};

export default function Navbar({ user }: Session): ReactElement {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const links = user ? authLinks : visitorLinks;

	return (
		<>
			<Box px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={'center'}>
						<Box>
							<Image
								src="/static/images/logo.jpeg"
								alt="logo"
								width="50"
								height="50"
								className="nav-logo"
							/>
						</Box>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							{links.map(({ name, url }) => (
								<NavLink key={url} url={url}>
									{name}
								</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<ColorModeIcon />
						{user ? (
							<>
								<Button
									variant={'solid'}
									colorScheme={'teal'}
									size={'sm'}
									mr={4}
									ml={4}
									leftIcon={<AddIcon />}
								>
									Action
								</Button>
								<Menu>
									<MenuButton
										as={Button}
										rounded={'full'}
										variant={'link'}
										cursor={'pointer'}
										minW={0}
									>
										{user?.image && <Avatar size={'sm'} src={user?.image} />}
									</MenuButton>
									<MenuList>
										<MenuItem
											onClick={() => {
												signOut();
											}}
										>
											Logout
										</MenuItem>
									</MenuList>
								</Menu>
							</>
						) : null}
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{links.map(({ url, name }) => (
								<NavLink key={url} url={url}>
									{name}
								</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
