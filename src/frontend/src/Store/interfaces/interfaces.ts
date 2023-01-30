export interface persistConfigType {
	key: string;
	storage: any;
}

export interface UserState {
	isLoggedIn?: boolean;
	accessToken?: string;
	data?: any;
}
