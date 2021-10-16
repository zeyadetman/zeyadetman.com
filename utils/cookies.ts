export const setCookie = (
	cookieName: string,
	cookieValue: string
): string | void => {
	if (document) {
		document.cookie = `${cookieName}=${cookieValue}; max-age=3600; path=/`;
	}
};

export const getCookie = (cookieName: string): string | void => {
	if (document) {
		return Object.fromEntries(
			document.cookie
				.split('; ')
				.map((v) => v.split('=').map(decodeURIComponent))
		)[cookieName];
	}
};
