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
import NLink from 'next/link';
import { customStyles } from '../styles/styles';

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
				mt={-4}
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

	const renderCareerStack = () => {
		if (isArabic) return null;

		return (
			<Stack mb="-32px !important" shouldWrapChildren>
				<Heading {...customStyles.Heading.sectionTitle({ color: h2TextColor })}>
					Career
					<Text {...customStyles.Text.subDescription}>
						freelance/part-time includes
					</Text>
				</Heading>

				<Text {...customStyles.Text.paragraph()}>
					<Badge background="green" me="1" mb="1" color="blackLight">
						Hire me!
					</Badge>
					Currently, I'm available for freelance work as a frontend engineer. My
					main tech stack is React, Typescript, Next.js, Node.js.
					{!site.openToWork && (
						<Text {...customStyles.Text.highlightRed()}>
							Note: I'm not available at the current time.
						</Text>
					)}
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
			<Stack mb={isArabic ? -4 : 8} shouldWrapChildren>
				<Heading
					color={useColorModeValue('black', 'white')}
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
				{isArabic ? (
					<>
						<Text {...customStyles.Text.paragraph()}>{t('arabicMessage')}</Text>
						{renderSendEmailButton()}
					</>
				) : (
					<>
						<Text {...customStyles.Text.paragraph()}>
							I am a software engineer, working as a Fullstack Engineer
							(Frontend heavily){' '}
							<Link href="https://www.crystalknows.com/personality-type/intj">
								INTJ
							</Link>{' '}
							is my type.
						</Text>

						<Text {...customStyles.Text.paragraph()}>
							This is my space on the internet, I've built it to reflect my
							digital presence. Here I share about
							<Link>
								<NLink href="/posts"> what I've learned or interested in</NLink>
							</Link>
							, things I'm working on,
							<Link>
								<NLink href="/gallery"> photos I took</NLink>
							</Link>
							.
						</Text>
					</>
				)}
			</Stack>

			{renderCareerStack()}
		</>
	);
}
