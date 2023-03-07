import instance from './index';
import {
	TWalletsResponseApi,
	TWalletPayload,
	TWalletResponseApi,
} from './interfaces/types';

export const getAllUserWallet = async (
	token: string
): Promise<TWalletsResponseApi> => {
	return await instance({
		url: `/wallet`,
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const createUserWallet = async (
	token: string,
	data: TWalletPayload
): Promise<TWalletResponseApi> => {
	return await instance({
		url: `/wallet`,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};

export const editUserWallet = async (
	token: string,
	id: string,
	data: TWalletPayload
): Promise<TWalletResponseApi> => {
	return await instance({
		url: `/wallet/${id}`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};
