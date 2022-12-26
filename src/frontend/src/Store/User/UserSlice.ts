import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../interfaces/interfaces';

const initialState: UserState = {
	isLoggedIn: false,
	accessToken: '',
	data: {},
};

const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserLoggedIn: (
			state: UserState,
			action: PayloadAction<UserState>
		) => {
			return {
				...state,
				isLoggedIn: true,
				accessToken: action.payload.accessToken,
				data: action.payload.data,
			};
		},
		setUserLoggedOut: () => {
			return { ...initialState };
		},
	},
});

export const { setUserLoggedIn, setUserLoggedOut } = UserSlice.actions;

export default UserSlice.reducer;
