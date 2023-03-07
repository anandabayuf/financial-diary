import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

export type TBaseQuery = {
	status: HttpStatusCode;
	message: string;
};

export type TBaseQuerySuccess<X> = TBaseQuery & {
	data: X;
};

export type TBaseQueryFailed = TBaseQuery & {
	detail: string | any | boolean;
};

export type TFetchResponse<X> = AxiosResponse<TBaseQuerySuccess<X>, any>;

export type TFetchErrorResponse = AxiosError<TBaseQueryFailed, any>;

export type TLoginResponseApi = TFetchResponse<string>;

export type TLoginPayload = {
	username: string;
	password: string;
};

export type TRegisterResponse = {
	_id: string;
	username: string;
	email: string;
	name: string;
	isEmailVerified: boolean;
};

export type TRegisterResponseApi = TFetchResponse<TRegisterResponse>;

export type TRegisterPayload = FormData;

export type TCheckTokenResponse = {
	id: string;
	username: string;
	name: string;
	email: string;
	isEmailVerified: string;
};

export type TCheckTokenResponseApi = TFetchResponse<TCheckTokenResponse>;

export type TVerifyEmailResponse = boolean;

export type TVerifyEmailResponseApi = TFetchResponse<TVerifyEmailResponse>;

export type TForgotPasswordResponse = string;

export type TForgotPasswordResponseApi =
	TFetchResponse<TForgotPasswordResponse>;

export type TForgotPasswordPayload = {
	email: string;
	username: string;
};

export type TResetPasswordPayload = {
	newPassword: string;
};

export type TResetPasswordResponse = {
	_id: string;
	username: string;
	email: string;
	name: string;
	isEmailVerified: boolean;
};

export type TResetPasswordResponseApi = TFetchResponse<TResetPasswordResponse>;

export type TEditUserByIdPayload = FormData;

export type TUserResponse = {
	_id: string;
	username: string;
	email: string;
	name: string;
	isEmailVerified: boolean;
	picture?: {
		data: Buffer;
		contentType: string;
	} | null;
};

export type TUserResponseApi = TFetchResponse<TUserResponse>;

export type TChangePasswordPayload = {
	oldPassword: string;
	newPassword: string;
};

export type TChangePasswordResponse = boolean;

export type TChangePasswordResponseApi =
	TFetchResponse<TChangePasswordResponse>;

export type TCategoryResponse = {
	_id: string;
	userId: string;
	name: string;
};

export type TCategoriesResponseApi = TFetchResponse<TCategoryResponse[]>;

export type TCategoryResponseApi = TFetchResponse<TCategoryResponse>;

export type TCategoryPayload = {
	name: string;
};

export type TWalletResponse = {
	_id: string;
	userId: string;
	name: string;
};

export type TWalletsResponseApi = TFetchResponse<TWalletResponse[]>;

export type TWalletResponseApi = TFetchResponse<TWalletResponse>;

export type TWalletPayload = {
	name: string;
};

export type TNoteResponse = {
	_id: string;
	userId: string;
	date: string;
	estimated: {
		balance: number;
		remains: number;
	};
};

export type TNotesResponseApi = TFetchResponse<TNoteResponse[]>;

export type TNoteResponseApi = TFetchResponse<TNoteResponse>;

export type TNotePayload = {
	date: string;
};

export type TCategoryNoteResponse = {
	_id: string;
	userId: string;
	category: TCategoryResponse;
	note: TNoteResponse;
	total: number;
	estimated: {
		total: number;
		remains: number;
	};
};

export type TCategoryNoteResponseApi = TFetchResponse<TCategoryNoteResponse>;

export type TCategoryNoteListResponseApi = TFetchResponse<
	TCategoryNoteResponse[]
>;

export type TCategoryNotePayload = {
	categoryIds: string[];
	noteId: string;
};

export type TCategoryNoteEstimationPayload = {
	categoryId: string;
	noteId: string;
	estimated: {
		total: number;
	};
};

export type TEditCategoryNotePayload = {
	noteId: string;
	estimated: {
		total: number;
	};
};

export type TWalletNoteResponse = {
	_id: string;
	userId: string;
	wallet: TWalletResponse;
	note: TNoteResponse;
	balance: number;
	estimated: {
		balance: number;
	};
};

export type TWalletNoteResponseApi = TFetchResponse<TWalletNoteResponse>;

export type TWalletNoteListResponseApi = TFetchResponse<TWalletNoteResponse[]>;

export type TWalletNotePayload = {
	walletIds: string[];
	noteId: string;
};

export type TWalletNoteEstimationPayload = {
	walletId: string;
	noteId: string;
	estimated: {
		balance: number;
	};
};

export type TEditWalletNotePayload = {
	noteId: string;
	estimated: {
		balance: number;
	};
};

export type TNoteItemResponse = {
	_id: string;
	userId: string;
	noteId: string;
	walletNoteId?: string;
	walletNoteId2?: string;
	categoryNoteId?: string;
	date: string;
	type: number;
	description: string;
	debit: number;
	credit: number;
};

export type TNoteItemListResponseApi = TFetchResponse<TNoteItemResponse[]>;

export type TNoteItemResponseApi = TFetchResponse<TNoteItemResponse>;

export type TNoteItemPayload = {
	date: string;
	description: string;
	type: number;
	debit?: number;
	credit?: number;
	categoryNoteId?: string;
	walletNoteId2?: string;
	walletNoteId?: string;
};

export type TEditNoteItemPayload = {
	date: string;
	description: string;
	debit?: number;
	credit?: number;
};
