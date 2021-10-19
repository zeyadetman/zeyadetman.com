import { ReactElement, useState } from 'react';
import {
	Stack,
	useColorModeValue,
	Heading,
	Text,
	Container,
	Flex,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
	email: string;
}
export default function Newsletter(): ReactElement {
	const { register, handleSubmit } = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const response = await (
			await fetch('https://www.getrevue.co/api/v2/subscribers', {
				method: 'POST',
				body: JSON.stringify({
					email: data.email,
					double_opt_in: false,
				}),
				headers: {
					Authorization: `Token ${process.env.NEXT_PUBLIC_GETREVUE_API_KEY}`,
					'Content-Type': 'application/json',
				},
			})
		).json();

		console.log({ response });
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
				<Heading
					as={'h2'}
					fontSize={{ base: 'xl', sm: '2xl' }}
					textAlign={'center'}
					mb={5}
				>
					Subscribe to our Newsletter
				</Heading>
				<Stack direction={{ base: 'column', md: 'row' }} spacing={'12px'}>
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
								<input
									className="member_submit"
									type="submit"
									value="Subscribe"
								/>
							</div>
						</form>
					</div>
				</Stack>
				<Text
					mt={6}
					textAlign={'center'}
					color={useColorModeValue('blackLight', 'whiteDark')}
					fontSize="sm"
				>
					Technical Blog | mostly about web development, Occasionally software
					engineering topics.
				</Text>
			</Container>
		</Flex>
	);
}
