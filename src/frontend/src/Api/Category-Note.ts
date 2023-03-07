import instance from './index';
import {
	TEditCategoryNotePayload,
	TWalletNoteBudgetPayload,
} from './interfaces/types';
import {
	TCategoryNoteListResponseApi,
	TCategoriesResponseApi,
	TCategoryNoteResponseApi,
	TCategoryNotePayload,
} from './interfaces/types';

export const getAllUserCategoryNote = async (
	token: string,
	noteId: string
): Promise<TCategoryNoteListResponseApi> => {
	return await instance({
		url: `/category-note/note/${noteId}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getAvailableUserCategory = async (
	token: string,
	noteId: string
): Promise<TCategoriesResponseApi> => {
	return await instance({
		url: `/category-note/note/${noteId}/available`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getUserCategoryNoteById = async (
	token: string,
	id: string
): Promise<TCategoryNoteResponseApi> => {
	return await instance({
		url: `/category-note/${id}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const addCategoryToTheNote = async (
	token: string,
	data: TCategoryNotePayload
): Promise<TCategoryNoteListResponseApi> => {
	return await instance({
		url: `/category-note`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const addCategoryNoteBudget = async (
	token: string,
	data: TWalletNoteBudgetPayload
): Promise<TCategoryNoteListResponseApi> => {
	return await instance({
		url: `/category-note/estimated`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const editCategoryNoteBudget = async (
	token: string,
	id: string,
	data: TEditCategoryNotePayload
): Promise<TCategoryNoteResponseApi> => {
	return await instance({
		url: `/category-note/${id}/estimated`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};
