import { Text, Heading, Link, Stack, Badge } from '@chakra-ui/layout';
import { AiOutlineSound } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';
import { careers } from '../utils/career';
import CareerStack from '../components/CareerStack';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { ReactElement } from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { site } from '../configs/site';
import { ICareer } from '../interfaces/career';
import { trackEvent } from '../libs/gtag';
import { EVENTS, EVENTS_CATEGORIES } from '../utils/events';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';
import PicOfMe from '../components/PicOfMe';

export async function getStaticProps({
	locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<unknown>> {
	const messages = await import(`/messages/${locale}.json`);
	return {
		props: {
			messages: JSON.stringify(messages),
		},
	};
}

export default function Home(): ReactElement {
	const { locale } = useRouter();
	const t = useTranslations('Index');
	const isArabic: boolean = locale === 'ar';
	const h2TextColor = useColorModeValue('black', 'white');

	const renderAboutPageTitle = () => {
		if (!isArabic) {
			return `${t('hello')}, I'm ${t('zeyad')} `;
		} else {
			return `${t('hello')} `;
		}
	};

	const renderSendEmailButton = () => {
		return (
			<Link
				fontSize="sm"
				href={`mailto:${site.email}`}
				fontStyle="italic"
				mb="24px !important"
				display="flex"
				alignItems="self-start"
				css={{ gap: '0 6px' }}
				target="_blank"
				onClick={() => {
					trackEvent({
						action: EVENTS.EMAIL_ME,
						label: EVENTS.EMAIL_ME,
						category: EVENTS_CATEGORIES.MID,
					});
				}}
			>
				<HiOutlineMailOpen fontSize="16px" /> {t('sendEmail')}
			</Link>
		);
	};

	const renderAboutPageContent = () => {
		if (isArabic) return null;

		return (
			<Stack mb="-32px !important">
				<Heading
					as="h2"
					size="xl"
					mb="16px !important"
					color={h2TextColor}
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

				{renderSendEmailButton()}

				{careers.map((career: ICareer) => (
					<CareerStack key={career.company} career={career} />
				))}
			</Stack>
		);
	};

	return (
		<>
			<Stack mb={isArabic ? -4 : 12}>
				<Heading
					color={useColorModeValue('black', 'white')}
					mb="-60px !important"
					zIndex={10000}
					fontWeight="extrabold"
				>
					{renderAboutPageTitle()}

					{!isArabic && (
						<Icon
							as={AiOutlineSound}
							boxSize="8"
							onClick={() => {
								trackEvent({
									action: EVENTS.PRONOUNCE_MY_NAME,
									category: EVENTS_CATEGORIES.MID,
									label: EVENTS.PRONOUNCE_MY_NAME,
								});
								const audio = new Audio('/static/sounds/zeyad_ar.mp3');
								audio.play();
							}}
						/>
					)}
				</Heading>
				<PicOfMe helloMessage={t('hello')} />
				{isArabic ? (
					<>
						<Text fontSize="sm" whiteSpace="pre-line" mb="8px !important">
							{t('arabicMessage')}
						</Text>
						{renderSendEmailButton()}
					</>
				) : (
					<>
						<Text fontSize="sm" mb="8px !important">
							I am a software engineer, working as a Fullstack Engineer
							(frontend heavily){' '}
							<Link href="https://www.crystalknows.com/personality-type/intj">
								INTJ
							</Link>{' '}
							is my type.
						</Text>

						<Text fontSize="sm">
							This is my space on internet, I write technical posts here, also
							may share some technical tutorials and articles. Also I like take
							photos, you can visit my online gallery.
						</Text>
					</>
				)}
			</Stack>

			{renderAboutPageContent()}
		</>
	);
}
