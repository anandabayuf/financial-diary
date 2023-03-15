import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataViewTypeNames } from '../../Constants/DataViewTypeNames';
import {
	NotePaginationSizeType,
	SelectedNoteType,
	ShowClosedType,
} from '../interfaces/interfaces';
import {
	NoteState,
	NoteDataViewType,
	NoteSelectedType,
} from '../interfaces/interfaces';

const initialState: NoteState = {
	selectedNote: {
		id: null,
		month: null,
		year: null,
		closed: null,
	},
	selectedCategoryNote: {
		id: null,
		name: null,
	},
	selectedWalletNote: {
		id: null,
		name: null,
	},
	showYear: 'all-year',
	showClosed: 'active',
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
			action: PayloadAction<SelectedNoteType>
		) => {
			return {
				...state,
				selectedNote: {
					...state.selectedNote,
					...action.payload,
				},
			};
		},
		setSelectedCategoryNote: (
			state: NoteState,
			action: PayloadAction<NoteSelectedType>
		) => {
			return {
				...state,
				selectedCategoryNote: {
					...state.selectedCategoryNote,
					...action.payload,
				},
				selectedWalletNote: {
					id: null,
					name: null,
				},
			};
		},
		setSelectedWalletNote: (
			state: NoteState,
			action: PayloadAction<NoteSelectedType>
		) => {
			return {
				...state,
				selectedWalletNote: {
					...state.selectedWalletNote,
					...action.payload,
				},
				selectedCategoryNote: {
					id: null,
					name: null,
				},
			};
		},
		setActiveKeyNoteTab: (
			state: NoteState,
			action: PayloadAction<string>
		) => {
			return {
				...state,
				activeKeyNoteTab: action.payload,
			};
		},
		setNoteDataViewType: (
			state: NoteState,
			action: PayloadAction<NoteDataViewType>
		) => {
			return {
				...state,
				dataViewType: {
					...state.dataViewType,
					...action.payload,
				},
			};
		},
		setNoteShowYear: (
			state: NoteState,
			action: PayloadAction<string | number>
		) => {
			return {
				...state,
				showYear: action.payload,
			};
		},
		setNoteShowClosed: (
			state: NoteState,
			action: PayloadAction<ShowClosedType>
		) => {
			return {
				...state,
				showClosed: action.payload,
			};
		},
		setNotePaginationSize: (
			state: NoteState,
			action: PayloadAction<NotePaginationSizeType>
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

export const {
	setSelectedNote,
	setSelectedCategoryNote,
	setSelectedWalletNote,
	setActiveKeyNoteTab,
	setNoteShowYear,
	setNoteShowClosed,
	setNoteDataViewType,
	setNotePaginationSize,
} = NoteSlice.actions;

export default NoteSlice.reducer;
