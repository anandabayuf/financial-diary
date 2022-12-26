import instance from './index';

export const login = async (credential: any): Promise<any> => {
	try {
		const response = await instance.post('/auth/login', credential);

		return response;
	} catch (err) {
		return err;
	}
};

export const register = async (user: any): Promise<any> => {
	try {
		const response = await instance({
			url: '/auth/register',
			method: 'POST',
			data: user,
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return response;
	} catch (err) {
		return err;
	}
};
