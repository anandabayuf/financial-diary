import { DataViewTypeNames } from '../../Constants/DataViewTypeNames';
import { TUserResponse } from '../../Api/interfaces/types';
import { VIEW_NOTE_TYPE } from '../../Constants/Constants';

export interface persistConfigType {
	key: string;
	storage: any;
}

export interface SetUserLoggedInType {
	accessToken: string | null;
	data: TUserResponse | null;
}

export interface UserState {
	isLoggedIn: boolean;
	accessToken: string | null;
	data: TUserResponse | null;
}

export interface NoteDataViewType {
	wallet?: DataViewTypeNames;
	category?: DataViewTypeNames;
	note?: DataViewTypeNames;
}

export interface NoteSelectedType {
	id: string | null;
	name: string | null;
}

export interface NotePaginationSizeType {
	note?: number;
	estimation?: number;
	wallet?: number;
	category?: number;
	items?: number;
}

export interface SelectedNoteType {
	id: string | null;
	year: string | null;
	month: string | null;
	closed: boolean | null;
}

export type ShowClosedType = 'all' | 'active' | 'closed';

export interface NoteState {
	selectedNote: SelectedNoteType;
	selectedWalletNote: NoteSelectedType;
	selectedCategoryNote: NoteSelectedType;
	showYear: number | string;
	showClosed: ShowClosedType;
	activeKeyNoteTab: string;
	dataViewType: {
		wallet: DataViewTypeNames;
		category: DataViewTypeNames;
		note: DataViewTypeNames;
	};
	paginationSize: {
		note: number;
		estimation: number;
		wallet: number;
		category: number;
		items: number;
	};
}

export interface ManagementPaginationSizeType {
	wallet?: number;
	category?: number;
}

export interface ManagementState {
	paginationSize: {
		wallet: number;
		category: number;
	};
}

export type LocaleType = 'en' | 'id';

export interface LocalizationState {
	locale: LocaleType;
}
