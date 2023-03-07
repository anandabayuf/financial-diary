import instance from './index';
import {
	TEditUserByIdPayload,
	TUserResponseApi,
	TChangePasswordResponseApi,
	TChangePasswordPayload,
} from './interfaces/types';

export const getUserById = async (
	id: string,
	token: string
): Promise<TUserResponseApi> => {
	return await instance({
		url: `/user/${id}`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const editUserById = async (
	token: string,
	id: string,
	data: TEditUserByIdPayload
): Promise<TUserResponseApi> => {
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

export const changePassword = async (
	token: string,
	data: TChangePasswordPayload
): Promise<TChangePasswordResponseApi> => {
	return await instance({
		url: '/user/change-password',
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	});
};
