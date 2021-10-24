import { Text, Heading, Link, Stack, Box, Badge } from '@chakra-ui/layout';
// import { NextPageContext } from 'next';
// import { getSession } from 'next-auth/client';
import { AiFillSound } from 'react-icons/ai';
import { Icon, createIcon } from '@chakra-ui/react';
import { careers } from '../utils/career';
import CareerStack from '../components/CareerStack';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Image from 'next/image';
import { ReactElement, useState } from 'react';
import { EmailIcon } from '@chakra-ui/icons';
import { site } from '../configs/site';
import { ICareer } from '../interfaces/career';

const Arrow = createIcon({
	displayName: 'Arrow',
	viewBox: '0 0 72 24',
	path: (
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
			fill="currentColor"
		/>
	),
});

// // eslint-disable-next-line
// export async function getServerSideProps(ctx: NextPageContext) {
// 	const session = await getSession(ctx);
// 	console.log({ session: session?.user });

// 	return {
// 		props: {
// 			user: session?.user || null,
// 		},
// 	};
// }

export default function Home(): ReactElement {
	const [sayHello, setSayHello] = useState(false);
	const toggleHover = () => setSayHello(!sayHello);

	return (
		<>
			<Stack mb="64px !important">
				<Heading
					color={useColorModeValue('black', 'white')}
					mb="-60px !important"
					zIndex={10000}
					fontWeight="extrabold"
				>
					Hi, I&apos;m Zeyad{' '}
					<Icon
						as={AiFillSound}
						boxSize="8"
						onClick={() => {
							const audio = new Audio('/static/sounds/zeyad_ar.mp3');
							audio.play();
						}}
					/>
				</Heading>
				<Stack
					position={'relative'}
					direction={'column'}
					spacing={3}
					align={'center'}
					alignSelf={'center'}
				>
					<Box justifyContent="center" display="flex" mb="12px !important">
						<Image
							src="/static/images/pic-of-me-removebg.png"
							alt="Picture of zeyad"
							width={350}
							height={370}
							quality="100"
							className="pic-of-me"
							onMouseEnter={toggleHover}
							onMouseLeave={toggleHover}
							loading="eager"
							priority
						/>
					</Box>
					<Box visibility={sayHello ? 'visible' : 'hidden'}>
						<Icon
							as={Arrow}
							color={useColorModeValue('black', 'gray.300')}
							w={71}
							position={'absolute'}
							right={{ xs: 50, sm: 70 }}
							top={{ xs: 190, sm: 210 }}
						/>
						<Text
							fontSize={'lg'}
							position={'absolute'}
							right={{ xs: 35, sm: '60px' }}
							top={{ xs: 160, sm: 180 }}
							transform={'rotate(15deg)'}
						>
							Hello
						</Text>
					</Box>
				</Stack>
				<Text fontSize="sm" mb="8px !important">
					I am a software engineer, working as a fullstack developer (frontend
					heavily){' '}
					<Link href="https://www.crystalknows.com/personality-type/intj">
						INTJ
					</Link>{' '}
					is my type.
				</Text>

				<Text fontSize="sm">
					This is my space on internet, I write technical posts here, also may
					share some technical tutorials and articles. Also I like take photos,
					you can visit my online gallery.
				</Text>
			</Stack>

			<Stack mb="-32px !important">
				<Heading
					as="h2"
					size="xl"
					mb="16px !important"
					color={useColorModeValue('black', 'white')}
					fontWeight="bold"
				>
					Career
					<Text
						fontSize="xs"
						ms={1}
						fontWeight={300}
						fontStyle="italic"
						display="inline"
					>
						freelance/part-time includes
					</Text>
				</Heading>

				<Text fontSize="sm" mb="12px !important">
					<Badge background="green" me="1" color="blackLight">
						Hire me!
					</Badge>
					I build web apps for startups, businesses as a freelance frontend
					developer. Let&apos;s discuss your needs and what solutions I can
					bring.
					{!site.openToWork && (
						<Text
							fontStyle="italic"
							fontWeight="700"
							background="red"
							p="2px 10px"
							mt="2"
							w="fit-content"
							color="whiteDark"
							as="span"
							display="inline-block"
						>
							Note: I&apos;m not available at the current time.
						</Text>
					)}
				</Text>

				<Text fontSize="sm">
					If you&apos;re a beginner or need advice from me, don&apos;t hesitate,
					Mail me and i&apos;ll send you some advices how to start learning
					frontend or programming.
				</Text>

				<Link
					fontSize="sm"
					href={`mailto:${site.email}`}
					fontStyle="italic"
					mb="24px !important"
				>
					<EmailIcon fontSize="lg" me="2" mb="0.5" />{' '}
					zeyad[.]etman[@]gmail[.]com
				</Link>

				{careers.map((career: ICareer) => (
					<CareerStack key={career.company} career={career} />
				))}
			</Stack>
		</>
	);
}
