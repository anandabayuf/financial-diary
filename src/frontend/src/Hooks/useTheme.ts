import { useState, useMemo } from 'react';
import { useAppSelector } from './useRedux';
import ThemeModeNames from '../Constants/ThemeModeNames';
import { Dark, Light, ColorState } from '../Constants/Colors';

const useTheme = () => {
	const theme = useAppSelector((state) => state.theme);
	const [colorTheme, setColorTheme] = useState<ColorState>();

	useMemo(() => {
		const changeColorTheme = () => {
			if (theme === ThemeModeNames.DARK) {
				setColorTheme(Dark);
				document.body.style.backgroundColor = Dark.bg;
				document.body.className = 'dark';
			} else {
				setColorTheme(Light);
				document.body.style.backgroundColor = Light.bg;
				document.body.className = 'light';
			}
		};

		changeColorTheme();
	}, [theme]);

	return colorTheme;
};

export default useTheme;
