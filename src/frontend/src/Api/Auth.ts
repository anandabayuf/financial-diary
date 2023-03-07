import instance from './index';
import {
	TResetPasswordResponseApi,
	TResetPasswordPayload,
} from './interfaces/types';
import {
	TVerifyEmailResponseApi,
	TForgotPasswordResponseApi,
	TForgotPasswordPayload,
} from './interfaces/types';
import {
	TLoginResponseApi,
	TLoginPayload,
	TRegisterResponseApi,
	TRegisterPayload,
	TCheckTokenResponseApi,
} from './interfaces/types';

export const login = async (
	credential: TLoginPayload
): Promise<TLoginResponseApi> => {
	return await instance.post('/auth/login', credential);
};

export const register = async (
	user: TRegisterPayload
): Promise<TRegisterResponseApi> => {
	return await instance({
		url: '/auth/register',
		method: 'POST',
		data: user,
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

export const authToken = async (
	token?: string
): Promise<TCheckTokenResponseApi> => {
	return await instance({
		url: '/auth/auth-token',
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const checkToken = async (
	token?: string
): Promise<TCheckTokenResponseApi> => {
	return await instance({
		url: '/auth/check-token',
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const verifyEmail = async (
	token: string
): Promise<TVerifyEmailResponseApi> => {
	return await instance({
		url: `/auth/verify-email`,
		headers: { Authorization: `Bearer ${token}` },
		method: 'POST',
	});
};

export const forgotPassword = async (
	data: TForgotPasswordPayload
): Promise<TForgotPasswordResponseApi> => {
	return await instance({
		url: `/auth/forgot-password`,
		method: 'POST',
		data: data,
	});
};

export const resetPassword = async (
	token: string,
	data: TResetPasswordPayload
): Promise<TResetPasswordResponseApi> => {
	return await instance({
		url: `/auth/reset-password`,
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});
};
