import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	ManagementState,
	ManagementPaginationSizeType,
} from '../interfaces/interfaces';

const initialState: ManagementState = {
	paginationSize: {
		category: 5,
		wallet: 5,
	},
};

const ManagementSlice = createSlice({
	name: 'management',
	initialState,
	reducers: {
		setManagementPaginationSize: (
			state: ManagementState,
			action: PayloadAction<ManagementPaginationSizeType>
		) => {
			return {
				...state,
				paginationSize: {
					...state.paginationSize,
					...action.payload,
				},
			};
		},
	},
});

export const { setManagementPaginationSize } = ManagementSlice.actions;

export default ManagementSlice.reducer;
