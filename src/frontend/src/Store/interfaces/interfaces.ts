export interface persistConfigType {
	key: string;
	storage: any;
}

export interface UserState {
	isLoggedIn?: boolean;
	accessToken?: string;
	data?: any;
}

export interface NotesState {
	notes?: any[];
	walletNotes?: any[];
	categoryNotes?: any[];
}
