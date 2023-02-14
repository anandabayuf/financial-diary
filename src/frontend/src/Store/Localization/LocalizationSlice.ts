import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalizationState } from '../interfaces/interfaces';

const initialState: LocalizationState = {
	locale: 'en',
};

const LocalizationSlice = createSlice({
	name: 'localization',
	initialState,
	reducers: {
		setLocalization: (
			state: LocalizationState,
			action: PayloadAction<LocalizationState>
		) => {
			return {
				...state,
				locale: action.payload.locale,
			};
		},
	},
});

export const { setLocalization } = LocalizationSlice.actions;

export default LocalizationSlice.reducer;
