import instance from './index';

export const getAllUserNotes = async (token?: string): Promise<any> => {
	return await instance({
		url: `/note`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const createUserNote = async (
	token?: string,
	data?: any
): Promise<any> => {
	return await instance({
		url: `/note`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const getUserNoteById = async (
	token?: string,
	id?: string
): Promise<any> => {
	return await instance({
		url: `/note/${id}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getUserNoteByDate = async (
	token?: string,
	dateString?: string
): Promise<any> => {
	return await instance({
		url: `/note?date=${dateString}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};
