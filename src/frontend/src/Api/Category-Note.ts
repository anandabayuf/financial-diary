import instance from './index';

export const getAllUserCategoryNote = async (
	token?: string,
	noteId?: string
): Promise<any> => {
	try {
		const response = await instance({
			url: `/category-note/note/${noteId}`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const getAvailableUserCategory = async (
	token?: string,
	noteId?: string
): Promise<any> => {
	try {
		const response = await instance({
			url: `/category-note/note/${noteId}/available`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const getUserCategoryNote = async (
	token?: string,
	id?: string
): Promise<any> => {
	try {
		const response = await instance({
			url: `/category-note/${id}`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const addCategoryToTheNote = async (
	token?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/category-note`,
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const addCategoryNoteEstimated = async (
	token?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/category-note/estimated`,
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const editCategoryNoteEstimated = async (
	token?: string,
	id?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/category-note/${id}/estimated`,
			method: 'PUT',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};
