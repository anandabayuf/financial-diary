import instance from './index';

export const getAllUserWallet = async (token?: string): Promise<any> => {
	try {
		const response = await instance({
			url: `/wallet`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};
