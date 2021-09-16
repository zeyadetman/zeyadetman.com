import { useColorMode } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IoMoonOutline, IoPartlySunnyOutline } from 'react-icons/io5';
import { RiMoonCloudyLine } from 'react-icons/ri';
import { FaCloudMoonRain } from 'react-icons/fa';
import { WiDaySunny, WiDayRainMix } from 'react-icons/wi';
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
function ColorModeIcon(props: Props) {
	const {} = props;
	const { colorMode, toggleColorMode } = useColorMode();
	const [weatherIcon, setWeatherIcon] = useState(weatherIcons.default);

	useEffect((): void => {
		try {
			navigator?.geolocation?.getCurrentPosition(
				async ({ coords: { longitude, latitude } }: GeolocationPosition) => {
					const body = await (
						await fetch(
							`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=87eb04e63a1d2d86f382d92a06242e9c`
						)
					).json();

					if (body.rain) {
						setWeatherIcon(weatherIcons.rain);
					} else if (body?.clouds?.all > 0) {
						setWeatherIcon(weatherIcons.cloud);
					} else {
						setWeatherIcon(weatherIcons.default);
					}
				}
			);
		} catch (e) {
			setWeatherIcon(weatherIcons.default);
		}
	}, []);

	return (
		<Icon fontSize="22px" onClick={toggleColorMode}>
			{colorMode === 'dark' ? weatherIcon.night : weatherIcon.day}
		</Icon>
	);
}

export default ColorModeIcon;
