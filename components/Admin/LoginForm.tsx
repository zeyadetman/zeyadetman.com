import React, { ReactElement } from 'react';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Center,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

interface Props {
	onSignInWithGoogle: () => Promise<unknown>;
}

function LoginForm(props: Props): ReactElement {
	const { onSignInWithGoogle } = props;

	return (
		<Flex minH={'100vh'} align={'center'} justify={'center'}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} color={useColorModeValue('black', 'white')}>
						Sign in to your account
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to access your awesome blog ✌️
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input type="email" />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input type="password" />
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}
							>
								<Checkbox>Remember me</Checkbox>
								<Link color={'blue.400'}>Forgot password?</Link>
							</Stack>
							<Button>Sign in</Button>
						</Stack>
					</Stack>
					<Stack spacing={10} mt={3}>
						<Button
							w={'full'}
							maxW={'md'}
							variant={'outline'}
							leftIcon={<FcGoogle />}
							onClick={onSignInWithGoogle}
						>
							<Center>
								<Text>Sign in with Google</Text>
							</Center>
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}

export default LoginForm;
