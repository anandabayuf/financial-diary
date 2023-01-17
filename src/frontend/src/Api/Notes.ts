import instance from './index';

export const getAllUserNotes = async (token?: string): Promise<any> => {
	try {
		const response = await instance({
			url: `/note`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const createUserNote = async (
	token?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/note`,
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};
