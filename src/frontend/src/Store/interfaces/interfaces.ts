import { DataViewTypeNames } from '../../Constants/DataViewTypeNames';
export interface persistConfigType {
	key: string;
	storage: any;
}

export interface UserState {
	isLoggedIn?: boolean;
	accessToken?: string;
	data?: any;
	isEmailVerificationSend?: boolean;
}

export interface NoteState {
	selectedNote?: {
		id?: string;
		year?: string;
		month?: string;
	};
	selectedWalletNote?: {
		id?: string;
		name?: string;
	};
	selectedCategoryNote?: {
		id?: string;
		name?: string;
	};
	showYear?: number | string;
	activeKeyNoteTab?: string;
	dataViewType?: {
		wallet?: DataViewTypeNames;
		category?: DataViewTypeNames;
		note?: DataViewTypeNames;
	};
	paginationSize?: {
		note?: number;
		estimation?: number;
		wallet?: number;
		category?: number;
		items?: number;
	};
}

export interface ManagementState {
	paginationSize?: {
		wallet?: number;
		category?: number;
	};
}

export type LocaleType = 'en' | 'id';

export interface LocalizationState {
	locale?: LocaleType;
}
