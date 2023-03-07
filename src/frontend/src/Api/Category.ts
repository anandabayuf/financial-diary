import instance from './index';
import {
	TCategoriesResponseApi,
	TCategoryPayload,
	TCategoryResponseApi,
} from './interfaces/types';

export const getAllUserCategory = async (
	token: string
): Promise<TCategoriesResponseApi> => {
	return await instance({
		url: `/category`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const createUserCategory = async (
	token: string,
	data: TCategoryPayload
): Promise<TCategoryResponseApi> => {
	return await instance({
		url: `/category`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const editUserCategory = async (
	token: string,
	id: string,
	data: TCategoryPayload
): Promise<TCategoryResponseApi> => {
	return await instance({
		url: `/category/${id}`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};
