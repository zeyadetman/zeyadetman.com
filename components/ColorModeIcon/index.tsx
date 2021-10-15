import { useColorMode } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import React, { useEffect, useState } from 'react';
import { IoMoonOutline, IoPartlySunnyOutline } from 'react-icons/io5';
import { RiMoonCloudyLine } from 'react-icons/ri';
import { FaCloudMoonRain } from 'react-icons/fa';
import { WiDaySunny, WiDayRainMix } from 'react-icons/wi';
import { getCookie, setCookie } from '../../utils/cookies';
interface Props {}

const weatherIcons = {
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
		const data = await (await fetch('http://ip-api.com/json')).json();
		setCookie('latitude', data.lat);
		setCookie('longitude', data.lon);
		return data;
	} catch (e) {
		throw new Error('fail');
	}
};

function ColorModeIcon(props: Props) {
	const {} = props;
	const { colorMode, toggleColorMode } = useColorMode();
	const [weatherIcon, setWeatherIcon] = useState(weatherIcons.default);

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
				.then(async ({ lat, lon }) => {
					try {
						const body = await (
							await fetch(
								`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=87eb04e63a1d2d86f382d92a06242e9c`
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
			const weather: 'default' | 'rain' | 'cloud' =
				getCookie('weather') || 'default';
			setWeatherIcon(weatherIcons[weather]);
		}
	}, []);

	return (
		<Icon fontSize="22px" onClick={toggleColorMode}>
			{colorMode === 'dark' ? weatherIcon.night : weatherIcon.day}
		</Icon>
	);
}

export default ColorModeIcon;
