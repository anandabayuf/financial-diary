import instance from './index';

export const login = async (credential: any): Promise<any> => {
	try {
		const response = await instance.post('/auth/login', credential);

		return response;
	} catch (err) {
		return err;
	}
};
