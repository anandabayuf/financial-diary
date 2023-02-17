import instance from './index';

export const getAllUserNoteItemsByNoteId = async (
	token?: string,
	noteId?: string
): Promise<any> => {
	return await instance({
		url: `/note-item/note/${noteId}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getAllUserWalletNoteItemsByNoteId = async (
	token?: string,
	noteId?: string,
	walletNoteId?: string
): Promise<any> => {
	return await instance({
		url: `/note-item/note/${noteId}?walletNoteId=${walletNoteId}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getAllUserCategoryNoteItemsByNoteId = async (
	token?: string,
	noteId?: string,
	categoryNoteId?: string
): Promise<any> => {
	return await instance({
		url: `/note-item/note/${noteId}?categoryNoteId=${categoryNoteId}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const createUserNoteItemByNoteId = async (
	token?: string,
	noteId?: string,
	data?: any
): Promise<any> => {
	return await instance({
		url: `/note-item/note/${noteId}`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const getUserNoteItemById = async (
	token?: string,
	id?: string
): Promise<any> => {
	return await instance({
		url: `/note-item/${id}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const editUserNoteItem = async (
	token?: string,
	id?: string,
	data?: any
): Promise<any> => {
	return await instance({
		url: `/note-item/${id}`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const deleteUserNoteItem = async (
	token?: string,
	id?: string
): Promise<any> => {
	return await instance({
		url: `/note-item/${id}`,
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` },
	});
};
