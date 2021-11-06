import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtl from 'stylis-plugin-rtl';
import { JSXElementConstructor, ReactElement } from 'react';
import { useRouter } from 'next/router';
// NB: A unique `key` is important for it to work!
const options = {
	rtl: { key: 'css-ar', stylisPlugins: [rtl] },
	ltr: { key: 'css-en' },
};
export function RtlProvider({
	children,
}: {
	children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}): ReactElement {
	const { locale } = useRouter();
	const dir = locale == 'ar' ? 'rtl' : 'ltr';
	const cache = createCache(options[dir]);
	return <CacheProvider value={cache}>{children}</CacheProvider>;
}
