import { ReactElement } from 'react';
import {
	Stack,
	useColorModeValue,
	Heading,
	Text,
	Container,
	Flex,
} from '@chakra-ui/react';

export default function Newsletter(): ReactElement {
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
				<Stack
					direction={{ base: 'column', md: 'row' }}
					as={'form'}
					spacing={'12px'}
				>
					<div id="revue-embed">
						<form
							action="https://www.getrevue.co/profile/zeyadetman/add_subscriber"
							method="post"
							id="revue-form"
							name="revue-form"
							target="_blank"
						>
							<div className="revue-form-group">
								<input
									className="revue-form-field"
									placeholder="Your email"
									type="email"
									name="member[email]"
									id="member_email"
								/>
							</div>
							<div className="revue-form-actions">
								<input
									type="submit"
									value="Subscribe"
									name="member[subscribe]"
									id="member_submit"
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
