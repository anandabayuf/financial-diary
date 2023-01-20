import instance from './index';

export const getAllUserWalletNote = async (
	token?: string,
	noteId?: string
): Promise<any> => {
	try {
		const response = await instance({
			url: `/wallet-note/note/${noteId}`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const getAvailableUserWallet = async (
	token?: string,
	noteId?: string
): Promise<any> => {
	try {
		const response = await instance({
			url: `/wallet-note/available/note/${noteId}`,
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});

		return response;
	} catch (err) {
		return err;
	}
};

export const addWalletToTheNote = async (
	token?: string,
	data?: any
): Promise<any> => {
	try {
		const response = await instance({
			url: `/wallet-note`,
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			data: data,
		});

		return response;
	} catch (err) {
		return err;
	}
};
