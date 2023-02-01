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
	activeKeyNoteTab: 'estimation-note-tab',
	dataViewType: {
		category: DataViewTypeNames.LIST,
		wallet: DataViewTypeNames.LIST,
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
				selectedNote: action.payload.selectedNote,
			};
		},
		setSelectedNoteId: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedNote: {
					...state.selectedNote,
					id: action.payload.selectedNote?.id,
				},
			};
		},
		setSelectedNoteYear: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedNote: {
					...state.selectedNote,
					year: action.payload.selectedNote?.year,
				},
			};
		},
		setSelectedNoteMonth: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedNote: {
					...state.selectedNote,
					month: action.payload.selectedNote?.month,
				},
			};
		},
		setSelectedCategoryNote: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedCategoryNote: action.payload.selectedCategoryNote,
				selectedWalletNote: {
					id: '',
					name: '',
				},
			};
		},
		setSelectedCategoryNoteId: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedCategoryNote: {
					...state.selectedCategoryNote,
					id: action.payload.selectedCategoryNote?.id,
				},
				selectedWalletNote: {
					id: '',
					name: '',
				},
			};
		},
		setSelectedCategoryNoteName: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedCategoryNote: {
					...state.selectedCategoryNote,
					name: action.payload.selectedCategoryNote?.name,
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
				selectedWalletNote: action.payload.selectedWalletNote,
				selectedCategoryNote: {
					id: '',
					name: '',
				},
			};
		},
		setSelectedWalletNoteId: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedWalletNote: {
					...state.selectedWalletNote,
					id: action.payload.selectedWalletNote?.id,
				},
				selectedCategoryNote: {
					id: '',
					name: '',
				},
			};
		},
		setSelectedWalletNoteName: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				selectedWalletNote: {
					...state.selectedWalletNote,
					name: action.payload.selectedWalletNote?.name,
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
		setDataViewTypeWalletNote: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				dataViewType: {
					...state.dataViewType,
					wallet: action.payload.dataViewType?.wallet,
				},
			};
		},
		setDataViewTypeCategoryNote: (
			state: NoteState,
			action: PayloadAction<NoteState>
		) => {
			return {
				...state,
				dataViewType: {
					...state.dataViewType,
					category: action.payload.dataViewType?.category,
				},
			};
		},
	},
});

export const {
	setSelectedNote,
	setSelectedNoteId,
	setSelectedNoteMonth,
	setSelectedNoteYear,
	setSelectedCategoryNote,
	setSelectedCategoryNoteId,
	setSelectedCategoryNoteName,
	setSelectedWalletNote,
	setSelectedWalletNoteId,
	setSelectedWalletNoteName,
	setActiveKeyNoteTab,
	setDataViewTypeWalletNote,
	setDataViewTypeCategoryNote,
} = NoteSlice.actions;

export default NoteSlice.reducer;
