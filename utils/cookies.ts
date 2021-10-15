export const setCookie = (cookieName: string, cookieValue: string) => {
	if (document) {
		document.cookie = `${cookieName}=${cookieValue}; max-age=3600; path=/`;
	}
};

export const getCookie = (cookieName: string) => {
	if (document) {
		return Object.fromEntries(
			document.cookie
				.split('; ')
				.map((v) => v.split('=').map(decodeURIComponent))
		)[cookieName];
	}
};
