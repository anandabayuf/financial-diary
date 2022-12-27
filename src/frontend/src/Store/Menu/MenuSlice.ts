import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	openKeys: [''],
	selectedKeys: [''],
};

const MenuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setOpenKeys: (state, action) => {
			return {
				...state,
				openKeys: action.payload,
			};
		},
		setSelectedKeys: (state, action) => {
			return {
				...state,
				selectedKeys: action.payload,
			};
		},
	},
});

export const { setOpenKeys, setSelectedKeys } = MenuSlice.actions;

export default MenuSlice.reducer;
