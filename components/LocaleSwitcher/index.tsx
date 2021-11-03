import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Flag from 'react-flagkit';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const SUPPORTED_LOCALES_WITH_FLAGS = {
	en: 'US',
	ar: 'EG',
};

type countryType = 'US' | 'EG';

function LocaleSwitcher(): ReactElement {
	const t = useTranslations('LocaleSwitcher');
	const router = useRouter();
	const { locale = 'en', locales, asPath, pathname, query } = router;
	const [activeLocale, anotherLocale] = [
		locale,
		locales?.find((loc) => loc !== locale),
	];

	//eslint-disable-next-line
	//@ts-ignore
	const countryFlag: countryType = SUPPORTED_LOCALES_WITH_FLAGS[locale];
	console.log({ locale, locales, activeLocale, anotherLocale });

	return (
		<Link
			href={{ pathname, query }}
			as={asPath}
			locale={anotherLocale}
			passHref
		>
			<Flag
				country={countryFlag}
				size={22}
				style={{ cursor: 'pointer' }}
				title={t('switchLang', { locale: 'en' })}
			/>
		</Link>
	);
}

export default LocaleSwitcher;
