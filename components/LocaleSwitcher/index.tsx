import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import Flag from 'react-flagkit';
import { useTranslations } from 'next-intl';
import { trackEvent } from '../../libs/gtag';
import { EVENTS, EVENTS_CATEGORIES } from '../../utils/events';

const SUPPORTED_LOCALES_WITH_FLAGS = {
	en: 'US',
	ar: 'EG',
};

type countryType = 'US' | 'EG';

function LocaleSwitcher(): ReactElement {
	const t = useTranslations('LocaleSwitcher');
	const router = useRouter();
	const [isFirstMount, setRenderCount] = useState(true);
	const { locale = 'en', locales, asPath } = router;
	const [activeLocale, anotherLocale] = [
		locale,
		locales?.find((loc) => loc !== locale),
	];

	//eslint-disable-next-line
	//@ts-ignore
	const countryFlag: countryType = SUPPORTED_LOCALES_WITH_FLAGS[locale];

	useEffect(() => {
		if (!isFirstMount) {
			trackEvent({
				action: EVENTS.SWITCH_LANG,
				label: `${EVENTS.TRIGGER_COLOR_MODE}: ${activeLocale}`,
				category: EVENTS_CATEGORIES.MID,
			});
		}

		setRenderCount(false);
		//eslint-disable-next-line
	}, [activeLocale]);

	return (
		<a href={`/${anotherLocale}${asPath}`}>
			<Flag
				country={countryFlag}
				size={22}
				style={{ cursor: 'pointer' }}
				title={t('switchLang')}
			/>
		</a>
	);
}

export default LocaleSwitcher;
