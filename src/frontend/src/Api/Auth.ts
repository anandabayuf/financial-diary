import instance from './index';

export const login = async (credential: any): Promise<any> => {
	return await instance.post('/auth/login', credential);
};

export const register = async (user: any): Promise<any> => {
	return await instance({
		url: '/auth/register',
		method: 'POST',
		data: user,
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

export const authToken = async (token?: string): Promise<any> => {
	return await instance({
		url: '/auth/auth-token',
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const checkToken = async (token?: string): Promise<any> => {
	return await instance({
		url: '/auth/check-token',
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const verifyEmail = async (token?: string): Promise<any> => {
	return await instance({
		url: `/auth/verify-email`,
		headers: { Authorization: `Bearer ${token}` },
		method: 'POST',
	});
};

export const forgotPassword = async (data?: any): Promise<any> => {
	return await instance({
		url: `/auth/forgot-password`,
		method: 'POST',
		data: data,
	});
};

export const resetPassword = async (
	token?: string,
	data?: any
): Promise<any> => {
	return await instance({
		url: `/auth/reset-password`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};
