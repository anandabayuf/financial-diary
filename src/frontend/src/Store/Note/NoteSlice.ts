import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataViewTypeNames } from '../../Constants/DataViewTypeNames';
import { NoteState } from '../interfaces/interfaces';

const initialState: NoteState = {
	selectedNote: {
		id: '',
		year: '',
		month: '',
	},
	selectedCategoryNote: {
		id: '',
		name: '',
	},
	selectedWalletNote: {
		id: '',
		name: '',
	},
	showYear: 'all-year',
	activeKeyNoteTab: 'budget-note-tab',
	dataViewType: {
		category: DataViewTypeNames.LIST,
		wallet: DataViewTypeNames.LIST,
		note: DataViewTypeNames.LIST,
	},
	paginationSize: {
		category: 5,
		estimation: 5,
		items: 5,
		note: 5,
		wallet: 5,
	},
};

const NoteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		setSelectedNote: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedNote: {
					...state.selectedNote,
					...action.payload.selectedNote,
				},
			};
		},
		setSelectedCategoryNote: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedCategoryNote: {
					...state.selectedCategoryNote,
					...action.payload.selectedCategoryNote,
				},
				selectedWalletNote: {
					id: '',
					name: '',
				},
			};
		},
		setSelectedWalletNote: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedWalletNote: {
					...state.selectedWalletNote,
					...action.payload.selectedWalletNote,
				},
				selectedCategoryNote: {
					id: '',
					name: '',
				},
			};
		},
		setActiveKeyNoteTab: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				activeKeyNoteTab: action.payload.activeKeyNoteTab,
			};
		},
		setNoteDataViewType: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				dataViewType: {
					...state.dataViewType,
					...action.payload.dataViewType,
				},
			};
		},
		setNoteShowYear: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				showYear: action.payload.showYear,
			};
		},
		setNotePaginationSize: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				paginationSize: {
					...state.paginationSize,
					...action.payload.paginationSize,
				},
			};
		},
	},
});

export const {
	setSelectedNote,
	setSelectedCategoryNote,
	setSelectedWalletNote,
	setActiveKeyNoteTab,
	setNoteShowYear,
	setNoteDataViewType,
	setNotePaginationSize,
} = NoteSlice.actions;

export default NoteSlice.reducer;
