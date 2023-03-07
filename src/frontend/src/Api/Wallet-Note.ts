import instance from './index';
import {
	TWalletNoteListResponseApi,
	TWalletsResponseApi,
	TWalletNoteResponseApi,
	TWalletNotePayload,
	TWalletNoteEstimationPayload,
	TEditWalletNotePayload,
} from './interfaces/types';

export const getAllUserWalletNote = async (
	token: string,
	noteId: string
): Promise<TWalletNoteListResponseApi> => {
	return await instance({
		url: `/wallet-note/note/${noteId}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getAvailableUserWallet = async (
	token: string,
	noteId: string
): Promise<TWalletsResponseApi> => {
	return await instance({
		url: `/wallet-note/note/${noteId}/available`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getUserWalletNoteById = async (
	token: string,
	id: string
): Promise<TWalletNoteResponseApi> => {
	return await instance({
		url: `/wallet-note/${id}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const addWalletToTheNote = async (
	token: string,
	data: TWalletNotePayload
): Promise<TWalletsResponseApi> => {
	return await instance({
		url: `/wallet-note`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const addWalletNoteEstimated = async (
	token: string,
	data: TWalletNoteEstimationPayload
): Promise<TWalletsResponseApi> => {
	return await instance({
		url: `/wallet-note/estimated`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const editWalletNoteEstimated = async (
	token: string,
	id: string,
	data: TEditWalletNotePayload
): Promise<TWalletNoteResponseApi> => {
	return await instance({
		url: `/wallet-note/${id}/estimated`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};
