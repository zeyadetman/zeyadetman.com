import { Text, Heading, Link, Stack, Center } from '@chakra-ui/layout';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';
import Layout from '../components/Layout';
import { AiFillSound } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';
import { careers } from '../utils/career';
import CareerStack from '../components/CareerStack';

export async function getServerSideProps(ctx: NextPageContext) {
	const session = await getSession(ctx);
	console.log({ session: session?.user });

	return {
		props: {
			user: session?.user || null,
		},
	};
}

export default function Home({ user }: any) {
	return (
		<Layout>
			<Stack>
				<Heading>
					Hi, I'm Zeyad{' '}
					<Icon
						as={AiFillSound}
						boxSize="8"
						onClick={() => {
							var audio = new Audio('/static/sounds/zeyad_ar.mp3');
							audio.play();
						}}
					/>
				</Heading>
				<Text fontSize="sm" marginTop="4">
					I am a software engineer, working as a fullstack developer (frontend
					heavily){' '}
					<Link href="https://www.crystalknows.com/personality-type/intj">
						INTJ
					</Link>{' '}
					is my type.
				</Text>

				<Text fontSize="sm" marginTop="8">
					This is my space on internet, I write technical posts here, also may
					share some technical tuturials, But if you're looking for my thoughts
					about life, so let me welcome you here. Also I like take photos, hurry
					up and open my online gallery.
				</Text>
			</Stack>

			<Stack marginTop="8" spacing="4">
				<Heading as="h2" size="xl">
					Career
				</Heading>

				{careers.map((career: any) => (
					<CareerStack career={career} />
				))}
			</Stack>
		</Layout>
	);
}
