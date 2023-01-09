import instance from './index';

export const getAllUserCategory = async (token?: string): Promise<any> => {
	try {
		const response = await instance({
			url: `/category`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const createUserCategory = async (
	token?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/category`,
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const editUserCategory = async (
	token?: string,
	id?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/category/${id}`,
			method: 'PUT',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};
