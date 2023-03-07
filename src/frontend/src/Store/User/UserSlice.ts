import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, SetUserLoggedInType } from '../interfaces/interfaces';
import { TUserResponse } from '../../Api/interfaces/types';

const initialState: UserState = {
	isLoggedIn: false,
	accessToken: null,
	data: null,
};

const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserLoggedIn: (
			state: UserState,
			action: PayloadAction<SetUserLoggedInType>
		) => {
			return {
				...state,
				isLoggedIn: true,
				...action.payload,
			};
		},
		setUserLoggedOut: () => {
			return { ...initialState };
		},
		updateUserData: (
			state: UserState,
			action: PayloadAction<TUserResponse>
		) => {
			return {
				...state,
				data: action.payload,
			};
		},
	},
});

export const { setUserLoggedIn, setUserLoggedOut, updateUserData } =
	UserSlice.actions;

export default UserSlice.reducer;
