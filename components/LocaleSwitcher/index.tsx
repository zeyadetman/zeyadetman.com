import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
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
	const [isFirstMount, setRenderCount] = useState(true);
	const { locale = 'en', locales, asPath, pathname, query, reload } = router;
	const [activeLocale, anotherLocale] = [
		locale,
		locales?.find((loc) => loc !== locale),
	];

	//eslint-disable-next-line
	//@ts-ignore
	const countryFlag: countryType = SUPPORTED_LOCALES_WITH_FLAGS[locale];

	useEffect(() => {
		if (!isFirstMount) {
			reload();
		}

		setRenderCount(false);
		//eslint-disable-next-line
	}, [activeLocale]);

	return (
		<Link
			href={{ pathname, query }}
			as={asPath}
			locale={anotherLocale}
			replace
			passHref
		>
			<Flag
				country={countryFlag}
				size={22}
				style={{ cursor: 'pointer' }}
				title={t('switchLang')}
			/>
		</Link>
	);
}

export default LocaleSwitcher;
