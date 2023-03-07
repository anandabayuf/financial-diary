import instance from './index';
import {
	TNotesResponseApi,
	TNoteResponseApi,
	TNotePayload,
} from './interfaces/types';

export const getAllUserNotes = async (
	token: string
): Promise<TNotesResponseApi> => {
	return await instance({
		url: `/note`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const createUserNote = async (
	token: string,
	data: TNotePayload
): Promise<TNoteResponseApi> => {
	return await instance({
		url: `/note`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const getUserNoteByDate = async (
	token: string,
	dateString: string
): Promise<TNotesResponseApi> => {
	return await instance({
		url: `/note?date=${dateString}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};
