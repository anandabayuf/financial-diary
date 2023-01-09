import instance from './index';

export const getAllUserWallet = async (token?: string): Promise<any> => {
	try {
		const response = await instance({
			url: `/wallet`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const createUserWallet = async (
	token?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/wallet`,
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const editUserWallet = async (
	token?: string,
	id?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/wallet/${id}`,
			method: 'PUT',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};
