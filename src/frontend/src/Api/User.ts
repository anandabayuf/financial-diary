import instance from './index';

export const getUserById = async (
	id?: string,
	token?: string
): Promise<any> => {
	return await instance({
		url: `/user/${id}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const editUserById = async (
	token?: string,
	id?: string,
	data?: any
): Promise<any> => {
	return await instance({
		url: `/user/${id}`,
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data;',
		},
		data: data,
	});
};
