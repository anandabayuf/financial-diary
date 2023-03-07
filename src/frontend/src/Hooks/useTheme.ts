import { useState, useMemo } from 'react';
import { useAppSelector } from './useRedux';
import ThemeModeNames from '../Constants/ThemeModeNames';
import { Dark, Light, ColorState } from '../Constants/Colors';

const useTheme = () => {
	const themeMode = useAppSelector((state) => state.theme);
	const [colorTheme, setColorTheme] = useState<ColorState>();

	useMemo(() => {
		const changeColorTheme = () => {
			if (themeMode === ThemeModeNames.DARK) {
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
	}, [themeMode]);

	return {
		mode: themeMode,
		color: colorTheme,
	};
};

export default useTheme;
