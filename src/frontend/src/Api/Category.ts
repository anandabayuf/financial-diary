import instance from './index';

export const getAllUserCategory = async (token?: string): Promise<any> => {
	return await instance({
		url: `/category`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const createUserCategory = async (
	token?: string,
	data?: any
): Promise<any> => {
	return await instance({
		url: `/category`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const editUserCategory = async (
	token?: string,
	id?: string,
	data?: any
): Promise<any> => {
	return await instance({
		url: `/category/${id}`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};
