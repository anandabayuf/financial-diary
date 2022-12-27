import instance from './index';

export const getUserById = async (
	id?: string,
	token?: string
): Promise<any> => {
	try {
		const response = await instance({
			url: `/user/${id}`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};
