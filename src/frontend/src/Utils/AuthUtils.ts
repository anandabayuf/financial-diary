import jwt_decode from 'jwt-decode';
import crypto from 'crypto';
import { PUBLIC_KEY } from '../Constants/Constants';

export const decodeJWT = (jwt: string, options?: any) => {
	return jwt_decode(jwt, options);
};

export const encryptPassword = (password: string): string => {
	try {
		const encryptedData = crypto.publicEncrypt(
			PUBLIC_KEY,
			Buffer.from(password)
		);

		return encryptedData.toString('base64');
	} catch (error) {
		console.log(error);
		throw new Error('Cannot encrypt Password');
	}
};
