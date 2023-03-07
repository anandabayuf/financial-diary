import instance from './index';
import {
	TFetchResponse,
	TNoteItemPayload,
	TEditNoteItemPayload,
} from './interfaces/types';
import {
	TNoteItemListResponseApi,
	TNoteItemResponseApi,
} from './interfaces/types';

export const getAllUserNoteItemsByNoteId = async (
	token: string,
	noteId: string
): Promise<TNoteItemListResponseApi> => {
	return await instance({
		url: `/note-item/note/${noteId}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getAllUserWalletNoteItemsByNoteId = async (
	token: string,
	noteId: string,
	walletNoteId: string
): Promise<TNoteItemListResponseApi> => {
	return await instance({
		url: `/note-item/note/${noteId}?walletNoteId=${walletNoteId}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getAllUserCategoryNoteItemsByNoteId = async (
	token: string,
	noteId: string,
	categoryNoteId: string
): Promise<TNoteItemListResponseApi> => {
	return await instance({
		url: `/note-item/note/${noteId}?categoryNoteId=${categoryNoteId}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const createUserNoteItemByNoteId = async (
	token: string,
	noteId: string,
	data: TNoteItemPayload
): Promise<TNoteItemResponseApi> => {
	return await instance({
		url: `/note-item/note/${noteId}`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const editUserNoteItem = async (
	token: string,
	id: string,
	data: TEditNoteItemPayload
): Promise<TNoteItemResponseApi> => {
	return await instance({
		url: `/note-item/${id}`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const deleteUserNoteItem = async (
	token: string,
	id: string
): Promise<TFetchResponse<null>> => {
	return await instance({
		url: `/note-item/${id}`,
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` },
	});
};
