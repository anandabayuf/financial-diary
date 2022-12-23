import { createSlice } from '@reduxjs/toolkit';
import ThemeModeNames from '../../Constants/ThemeModeNames';

const initialState: ThemeModeNames = window.matchMedia(
	'(prefers-color-scheme: dark)'
).matches
	? ThemeModeNames.DARK
	: ThemeModeNames.LIGHT;

const ThemeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setLightMode: () => {
			return ThemeModeNames.LIGHT;
		},
		setDarkMode: () => {
			return ThemeModeNames.DARK;
		},
	},
});

export const { setLightMode, setDarkMode } = ThemeSlice.actions;

export default ThemeSlice.reducer;
