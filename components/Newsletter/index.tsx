import { ReactElement, useState } from 'react';
import {
	Stack,
	useColorModeValue,
	Heading,
	Text,
	Container,
	Flex,
	Box,
	Spinner,
	InputGroup,
	InputLeftElement,
	Input,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { RiErrorWarningLine } from 'react-icons/ri';
import { site } from '../../configs/site';

interface Inputs {
	email: string;
}

export default function Newsletter(): ReactElement {
	const spinnerColor = useColorModeValue('black', 'white');
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState<boolean>(false);
	const [visitorSubscribed, setVisitorSubscribe] = useState<
		'success' | 'fail' | 'init'
	>('init');
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		const { status } = await fetch('/api/subscribers', {
			method: 'POST',
			body: JSON.stringify({
				email: data.email,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		setLoading(false);
		if (status === 201) {
			setVisitorSubscribe('success');
		} else {
			setVisitorSubscribe('fail');
		}
	};

	const renderSubscribeTitle = () => {
		if (visitorSubscribed === 'init') {
			return (
				<Heading
					as={'h2'}
					fontSize={{ base: 'xl', sm: '2xl' }}
					textAlign={'center'}
					mb={5}
				>
					Subscribe to our Newsletter
				</Heading>
			);
		} else if (visitorSubscribed === 'success') {
			return (
				<Heading
					as={'h2'}
					fontSize={{ base: 'xl', sm: '2xl' }}
					textAlign={'center'}
					color={'green'}
				>
					<Box
						as={IoMdCheckmarkCircleOutline}
						m="0 auto"
						size="32px"
						color="green.400"
						mb={5}
					/>
					Thanks for subscribing to our newsletter
				</Heading>
			);
		} else if (visitorSubscribed === 'fail') {
			return (
				<Heading
					as={'h2'}
					fontSize={{ base: 'xl', sm: '2xl' }}
					textAlign={'center'}
					color={'red'}
					mb={2.5}
				>
					<Box
						as={RiErrorWarningLine}
						m="0 auto"
						size="32px"
						color="green.400"
						mb={2.5}
					/>
					Failed to subscribe!
				</Heading>
			);
		}
	};

	return (
		<Flex my={8} align={'center'} justify={'center'}>
			<Container
				maxW={'lg'}
				bg={useColorModeValue('white', 'whiteAlpha.100')}
				boxShadow={'xl'}
				rounded={'lg'}
				p={6}
				direction={'column'}
			>
				{renderSubscribeTitle()}
				<Stack direction={{ base: 'column', md: 'row' }} spacing={'12px'}>
					{visitorSubscribed === 'success' ? null : (
						<div className="revue-embed">
							<form onSubmit={handleSubmit(onSubmit)} className="revue-form">
								<div className="revue-form-group">
									<input
										className="revue-form-field member_email"
										placeholder="Your email"
										type="email"
										{...register('email')}
									/>
								</div>
								<div className="revue-form-actions">
									<InputGroup>
										{loading ? (
											<InputLeftElement>
												<Spinner
													color={spinnerColor}
													pos="absolute"
													left="36px"
												/>
											</InputLeftElement>
										) : null}
										<Input
											type="submit"
											value="Subscribe"
											className="member_submit"
											{...(loading ? { opacity: '0.5' } : {})}
										/>
									</InputGroup>
								</div>
							</form>
						</div>
					)}
				</Stack>
				<Text
					mt={6}
					textAlign={'center'}
					color={useColorModeValue('blackLight', 'whiteDark')}
					fontSize="sm"
				>
					{site.description}
				</Text>
			</Container>
		</Flex>
	);
}
