import { useColorMode } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import React, { ReactElement, useEffect, useState } from 'react';
import { IoMoonOutline, IoPartlySunnyOutline } from 'react-icons/io5';
import { RiMoonCloudyLine } from 'react-icons/ri';
import { FaCloudMoonRain } from 'react-icons/fa';
import { WiDaySunny, WiDayRainMix } from 'react-icons/wi';
import { getCookie, setCookie } from '../../utils/cookies';
import { trackEvent } from '../../libs/gtag';
import { EVENTS, EVENTS_CATEGORIES } from '../../utils/events';

const weatherIcons: {
	[key: string]: { day: JSX.Element; night: JSX.Element };
} = {
	default: {
		night: <IoMoonOutline />,
		day: <WiDaySunny />,
	},
	rain: {
		day: <WiDayRainMix />,
		night: <FaCloudMoonRain />,
	},
	cloud: {
		day: <IoPartlySunnyOutline />,
		night: <RiMoonCloudyLine />,
	},
};

const getLocation = async () => {
	try {
		const data = await (await fetch('https://geolocation-db.com/json/')).json();
		setCookie('latitude', data.latitude);
		setCookie('longitude', data.longitude);
		return data;
	} catch (e) {
		throw new Error('fail');
	}
};

function ColorModeIcon(): ReactElement {
	const { colorMode, toggleColorMode } = useColorMode();
	const [weatherIcon, setWeatherIcon] = useState<{
		day: JSX.Element;
		night: JSX.Element;
	}>(weatherIcons.default);

	// eslint-disable-next-line
	const applyWeatherIcon = (body: any) => {
		if (body.rain) {
			setCookie('weather', 'rain');
			setWeatherIcon(weatherIcons.rain);
		} else if (body?.clouds?.all > 0) {
			setCookie('weather', 'cloud');
			setWeatherIcon(weatherIcons.cloud);
		} else {
			setCookie('weather', 'default');
			setWeatherIcon(weatherIcons.default);
		}
	};

	useEffect((): void => {
		const lat = getCookie('latitude');
		const lon = getCookie('longitude');

		if (!(lat && lon)) {
			getLocation()
				.then(async ({ latitude, longitude }) => {
					try {
						const body = await (
							await fetch(
								`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=87eb04e63a1d2d86f382d92a06242e9c`
							)
						).json();

						applyWeatherIcon(body);
					} catch (error) {
						throw new Error('Error');
					}
				})
				.catch(() => {
					setCookie('weather', 'default');
					setWeatherIcon(weatherIcons.default);
				});
		} else {
			const weather: string = getCookie('weather') || 'default';
			setWeatherIcon(weatherIcons[weather]);
		}
	}, []);

	return (
		<Icon
			fontSize="22px"
			onClick={() => {
				toggleColorMode();
				trackEvent({
					action: EVENTS.TRIGGER_COLOR_MODE,
					label: EVENTS.TRIGGER_COLOR_MODE,
					category: EVENTS_CATEGORIES.LOW,
				});
			}}
		>
			{colorMode === 'dark' ? weatherIcon.night : weatherIcon.day}
		</Icon>
	);
}

export default ColorModeIcon;
